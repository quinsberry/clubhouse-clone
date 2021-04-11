import { FC } from 'react'
import Link from 'next/link'

interface BackButtonProps {
    title: string
    href: string
}

export const BackButton: FC<BackButtonProps> = ({ title, href }) => {
    return (
        <Link href={href}>
            <div className='d-flex mb-30 cup'>
                <img src='/static/back-arrow.svg' alt='Back' className='mr-10' />
                <h3>{title}</h3>
            </div>
        </Link>
    )
}
