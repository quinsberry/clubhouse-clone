import clsx from 'clsx'
import Link from 'next/link'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import styles from './Room.module.scss'
import { Button } from '@components/common/Button'
import { useRouter } from 'next/router'
import { useTypedSelector } from '@hooks/useReduxHooks'
import { selectUserData } from '@store/user/selectors'
import { Speaker } from '@components/Speaker'
import { useSocket } from '@hooks/useSocket'
import { UserData } from '@pages/index'
import { assertNonNull } from '@utils/type-guards'
import { usePeers } from '@hooks/usePeers'

interface RoomProps {
    title: string
}

export const Room: FunctionComponent<RoomProps> = ({ title }) => {
    const router = useRouter()
    const roomId = router.query.id
    const user = useTypedSelector(selectUserData)
    const socket = useSocket()
    const { addPeer, createSignal, removePeer, hasPeer } = usePeers()
    const audioRef = useRef<HTMLAudioElement>()
    const streamRef = useRef<MediaStream>()

    const [users, setUsers] = useState<UserData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(stream => {
                    socket.emit('CLIENT@ROOMS:JOIN', { user, roomId })

                    assertNonNull(user, 'Problems with receiving user info from the server')
                    socket.on('SERVER@ROOMS:JOIN', (allUsers: UserData[]) => {
                        setUsers(allUsers)
                        setIsLoading(false)

                        allUsers.forEach((speaker) => {
                            if (user.id !== speaker.id && !hasPeer(speaker.id)) {
                                const peerIncome = new Peer({
                                    initiator: true,
                                    trickle: false,
                                    stream,
                                })

                                // Received the signal from ICE-server and asking all the members call me
                                peerIncome.on('signal', (signal) => {
                                    socket.emit('CLIENT@ROOMS:CALL', {
                                        targetUserId: speaker.id,
                                        callerUserId: user.id,
                                        roomId,
                                        signal,
                                    })
                                    addPeer({ peer: peerIncome, id: speaker.id })
                                })

                                socket.on(
                                    'SERVER@ROOMS:CALL',
                                    ({ targetUserId, callerUserId, signal: callerSignal }) => {

                                        const peerOutcome = new Peer({
                                            initiator: false,
                                            trickle: false,
                                            stream,
                                        })

                                        // Calling to person and waiting a signal which needs to be sent back to user as an answer
                                        peerOutcome.signal(callerSignal)

                                        peerOutcome
                                            // Receiving the signal from ICE-server and sending it to user for making connection
                                            .on('signal', (outSignal) => {
                                                socket.emit('CLIENT@ROOMS:ANSWER', {
                                                    targetUserId: callerUserId,
                                                    callerUserId: targetUserId,
                                                    roomId,
                                                    signal: outSignal,
                                                })
                                            })
                                            // Reproducing the sound when someone's answered
                                            .on('stream', (stream) => {
                                                const audio = document.querySelector('audio')
                                                assertNonNull(audio, 'Cannot create p2p connection without audio element')
                                                audioRef.current = audio
                                                streamRef.current = stream

                                                audioRef.current.srcObject = stream
                                                audioRef.current.paused
                                                audioRef.current.play()

                                                setIsConnected(true)
                                            })
                                    },
                                )

                                socket.on('SERVER@ROOMS:ANSWER', ({ callerUserId, signal }) => {
                                    createSignal(callerUserId, signal)
                                })
                            }
                        })
                    })

                    socket.on('SERVER@ROOMS:LEAVE', (leaveUser: UserData) => {
                        removePeer(leaveUser.id)
                        setUsers(prev => prev.filter(user => user.id !== leaveUser.id))

                    })
                })
                .catch(() => {
                    console.error('No access to microphone')
                })
        }
    }, [])


    return (
        <div className={styles.wrapper}>
            <audio controls />
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className={styles.title}>{title}</h2>
                <div className={clsx('d-flex align-items-center', styles.actionButtons)}>
                    <Link href='/rooms'>
                        <a>
                            <Button color='gray' className={styles.leaveButton}>
                                <img width={18} height={18} src='/static/peace.png' alt='Hand black' />
                                Leave quietly
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
            <div className={styles.users}>
                {isLoading ? null : users.map(userData => (
                    <Speaker
                        key={`${userData.fullname}${userData.id}`}
                        {...userData}
                        stream={streamRef.current}
                        isConnected={isConnected}
                    />
                ))}
            </div>
        </div>
    )
}
