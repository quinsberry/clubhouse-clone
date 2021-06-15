import React, { FC } from 'react'
import clsx from 'clsx'

import { Avatar } from '@components/common/Avatar'
import { Button } from '@components/common/Button'

import styles from './Profile.module.scss'
import { BackButton } from '@components/common/BackButton'

interface ProfileProps {
    fullname: string
    username: string | null
    avatarUrl: string | null
    about: string
}

export const Profile: FC<ProfileProps> = ({ fullname, username, avatarUrl, about }) => {
    const avatarLetters = fullname.split(' ').map(_ => _[0]).join('')
    return (
        <>
            <div className="d-if mb-30">
                <BackButton title="Back" />
            </div>

            <div className="d-flex  align-items-center">
                <div className="d-flex align-items-center">
                    <Avatar src={avatarUrl ?? undefined} letters={avatarLetters} width="100px" height="100px" />
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
