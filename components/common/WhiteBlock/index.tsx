import { FC } from 'react'
import clsx from 'clsx'

import styles from './WhiteBlock.module.scss'

interface WhiteBlockProps {
    className?: string
}

export const WhiteBlock: FC<WhiteBlockProps> = ({ children, className }) => {
    return <div className={clsx(styles.block, className)}>{children}</div>
}
