import Link from 'next/link'
import React, { FC } from 'react'
import { Avatar } from '@components/common/Avatar'

export type SpeakerProps = {
    id: number
    fullname: string
    avatarUrl: string | null
};

export const Speaker: FC<SpeakerProps> = ({ id, fullname, avatarUrl }) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className='d-i-flex flex-column align-items-center mr-40 mb-40'>
                <Avatar src={avatarUrl ?? undefined} height='100px' width='100px' />
                <div className='mt-10'>
                    <b>{fullname}</b>
                </div>
            </a>
        </Link>
    )
}
