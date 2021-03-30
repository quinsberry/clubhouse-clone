import { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { Avatar } from '@components/common/Avatar'

import styles from './Header.module.scss'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
    return (
        <div className={styles.header}>
            <div className="container d-flex align-items-center justify-content-between">
                <Link href="/rooms">
                    <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
                        <img src="/static/hand-wave.png" alt="Logo" className="mr-5" />
                        <h4>Clubhouse</h4>
                    </div>
                </Link>
                <Link href="/profile/1">
                    <div className="d-flex align-items-center cup">
                        <b className="mr-5">Name Surname</b>
                        <Avatar
                            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                            width="50px"
                            height="50px"
                        />
                    </div>
                </Link>
            </div>
        </div>
    )
}
