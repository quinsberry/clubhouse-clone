import React, { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Avatar } from '@components/common/Avatar'
import { Button } from '@components/common/Button'

import styles from './Profile.module.scss'
import { BackButton } from '@components/common/BackButton'

interface ProfileProps {
    fullname: string
    username: string
    avatarUrl: string
    about: string
}

export const Profile: FC<ProfileProps> = ({ fullname, username, avatarUrl, about }) => {
    return (
        <>
            <BackButton href="/rooms" title="Back" />

            <div className="d-flex  align-items-center">
                <div className="d-flex align-items-center">
                    <Avatar src={avatarUrl} width="100px" height="100px" />
                    <div className="d-flex flex-column ml-30 mr-30">
                        <h2 className="mt-0 mb-0">{fullname}</h2>
                        <h3 className={clsx(styles.username, 'mt-0 mb-0')}>@{username}</h3>
                    </div>
                </div>
                <Button className={styles.followButton} color="blue">
                    Follow
                </Button>
            </div>
            <p className={styles.about}>{about}</p>
        </>
    )
}