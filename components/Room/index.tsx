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
    const user = useTypedSelector(selectUserData)
    const audioRef = useRef<HTMLAudioElement>()
    const [users, setUsers] = useState<UserData[]>([])
    const roomId = router.query.id
    const socket = useSocket()
    const { peers, addPeer, createSignal, removePeer, hasPeer } = usePeers()

    useEffect(() => {
        console.log('isActive: ', audioRef.current?.paused)
    }, [audioRef.current])


    useEffect(() => {
        if (typeof window !== 'undefined') {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(stream => {
                    socket.emit('CLIENT@ROOMS:JOIN', { user, roomId })

                    assertNonNull(user, 'Problems with receiving user info from the server')
                    socket.on('SERVER@ROOMS:JOIN', (allUsers: UserData[]) => {
                        setUsers(allUsers)

                        allUsers.forEach((speaker) => {
                            if (user.id !== speaker.id && !hasPeer(speaker.id)) {
                                const peerIncome = new Peer({
                                    initiator: true,
                                    trickle: false,
                                    stream,
                                })

                                // Received the signal from ICE-server and asking all the members call me
                                peerIncome.on('signal', (signal) => {
                                    console.log(signal, 222)
                                    console.log(
                                        '1. СИГНАЛ СОЗДАН. ПРОСИМ ЮЗЕРА ' + speaker.fullname + ' НАМ ПОЗВОНИТЬ',
                                    )
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
                                        console.log('2. ЮЗЕР ' + callerUserId + ' ПОДКЛЮЧИЛСЯ, ЗВОНИМ!')

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
                                                console.log(
                                                    '3. ПОЛУЧИЛИ СИГНАЛ НАШ, ОТПРАВЛЯЕМ В ОТВЕТ ЮЗЕРУ ' + callerUserId,
                                                )
                                                console.log('peers: ', peers)
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

                                                audioRef.current.srcObject = stream
                                                audioRef.current.paused
                                                audioRef.current.play()
                                            })
                                    },
                                )

                                socket.on('SERVER@ROOMS:ANSWER', ({ callerUserId, signal }) => {
                                    createSignal(callerUserId, signal)
                                    console.log('4. МЫ ОТВЕТИЛИ ЮЗЕРУ', callerUserId)
                                })
                            }
                        })
                    })

                    socket.on('SERVER@ROOMS:LEAVE', (leaveUser: UserData) => {
                        console.log(leaveUser.id, peers)
                        removePeer(leaveUser.id)
                        setUsers(prev => prev.filter(user => user.id !== leaveUser.id))

                    })
                })
                .catch(() => {
                    console.error('Нет доступа к микрофону')
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
                {users.map((userData, idx) => (
                    <Speaker key={`${userData.fullname}${idx}`} {...userData} isVoice={false} />
                ))}
            </div>
        </div>
    )
}
