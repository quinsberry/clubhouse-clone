import Link from 'next/link'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Avatar } from '@components/common/Avatar'
import { useDebouncedCallback } from 'use-debounce'

export type SpeakerProps = {
    id: number
    fullname: string
    avatarUrl: string | null
    stream: MediaStream | undefined
    isConnected: boolean
};

export const Speaker: FC<SpeakerProps> = ({ id, fullname, avatarUrl, stream , isConnected}) => {
    const [isActive, setIsActive] = useState(false)
    const isStream = useRef(false)

    const setDeactivated = useDebouncedCallback(() => {
        setIsActive(false)
    }, 500)

    useEffect(() => {
        if (stream) {
            const audioContext = new AudioContext()
            const analyser = audioContext.createAnalyser()
            const source = audioContext.createMediaStreamSource(stream)
            source.connect(analyser)

            analyser.fftSize = 1024
            const dataArr = new Uint8Array(analyser.frequencyBinCount)
            isStream.current = true

            function update() {
                requestAnimationFrame(update)
                analyser.getByteTimeDomainData(dataArr)
                let values = 0
                for (var i = 0; i < dataArr.length; i++) {
                    values += dataArr[i]
                }

                if (values / dataArr.length / 128 > 1) {
                    setIsActive(true)
                    setDeactivated()
                }
            }

            update()
        }
    }, [isConnected])

    return (
        <Link href={`/profile/${id}`}>
            <a className='d-if flex-column align-items-center'>
                <Avatar src={avatarUrl ?? undefined} height='100px' width='100px' isVoice={isActive} />
                <div className='mt-10'>
                    <b>{fullname}</b>
                </div>
            </a>
        </Link>
    )
}
