import { FC } from 'react'
import clsx from 'clsx'

import { Avatar } from '@components/common/Avatar'

import styles from './ConversationCard.module.scss'
import whiteBlockStyles from '@components/common/WhiteBlock/WhiteBlock.module.scss'
import { UserData } from '@pages/index'

interface ConversationCard {
    title: string;
    speakers: UserData[]
    listenersCount: number

}

export const ConversationCard: FC<ConversationCard> = ({
                                                           title,
                                                           speakers = [],
                                                           listenersCount,
                                                       }) => {
    return (
        <div className={clsx(whiteBlockStyles.block, styles.card)}>
            <h4 className={styles.title}>{title}</h4>
            <div className={clsx('d-flex mt-10', styles.content)}>
                <div className={styles.avatars}>
                    {speakers.map((user, i) => (
                        <Avatar
                            key={user.id}
                            width='45px'
                            height='45px'
                            src={user.avatarUrl ?? undefined}
                            className={speakers.length > 1 && i === speakers.length - 1 ? 'lastAvatar' : ''}
                        />
                    ))}
                </div>
                <div className={clsx(styles.info, 'ml-10')}>
                    <ul className={styles.users}>
                        {speakers.map(user => (
                            <li key={user.id}>
                                {user.fullname} <img src='/static/cloud.png' alt='Cloud' width={14} height={14} />
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.details}>
                        <li>
                            <img src='/static/user.svg' alt='Users count' width={12} height={12} />
                            {' '}{listenersCount}
                        </li>
                        <li>
                            <img
                                className='ml-5'
                                src='/static/message.svg'
                                alt='Users count'
                                width={12}
                                height={12}
                            />{' '}
                            {speakers.length}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
