import { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { useTypedSelector } from '@hooks/useReduxHooks'
import { selectUserData } from '@store/user/selectors'
import { Avatar } from '@components/common/Avatar'
import styles from './Header.module.scss'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
    const userData = useTypedSelector(selectUserData)
    const avatarLetters = userData?.fullname.split(' ').map(_ => _[0]).join('')

    return (
        <div className={styles.header}>
            <div className="container d-flex align-items-center justify-content-between">
                <Link href="/rooms">
                    <a>
                        <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
                            <img src="/static/hand-wave.png" alt="Logo" className="mr-5" />
                            <h4>Clubhouse</h4>
                        </div>
                    </a>
                </Link>
                <Link href={`/profile/${userData?.id}`}>
                    <a>
                        <div className="d-flex align-items-center cup">
                            <b className="mr-5">{userData?.fullname}</b>
                            <Avatar width='50px' height='50px' src={userData?.avatarUrl ?? undefined} letters={avatarLetters} />
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
