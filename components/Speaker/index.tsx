import Link from 'next/link'
import React, { FC } from 'react'
import { Avatar } from '@components/common/Avatar'

export type SpeakerProps = {
    id: number
    fullname: string
    avatarUrl: string | null
    isVoice: boolean
};

export const Speaker: FC<SpeakerProps> = ({ id, fullname, avatarUrl, isVoice }) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className='d-if flex-column align-items-center'>
                <Avatar src={avatarUrl ?? undefined} height='100px' width='100px' isVoice={isVoice} />
                <div className='mt-10'>
                    <b>{fullname}</b>
                </div>
            </a>
        </Link>
    )
}
