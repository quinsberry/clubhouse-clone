import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

import styles from './Room.module.scss'
import { Button } from '@components/common/Button'
import { useRouter } from 'next/router'
import { useTypedSelector } from '@hooks/useReduxHooks'
import { selectUserData } from '@store/user/selectors'
import { UserData } from '@pages/index'
import { Speaker } from '@components/Speaker'

interface RoomProps {
    title: string
}

export const Room: React.FC<RoomProps> = ({ title }) => {
    const router = useRouter()
    const user = useTypedSelector(selectUserData)
    const [users, setUsers] = React.useState<UserData[]>([])
    const roomId = router.query.id

    return (
        <div className={styles.wrapper}>
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
            <div className='users'>
                {users.map((userData) => (
                    <Speaker key={userData.fullname} {...userData} />
                ))}
            </div>
        </div>
    )
}
