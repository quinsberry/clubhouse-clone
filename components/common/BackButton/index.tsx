import { FC } from 'react'
import { useRouter } from 'next/router'

interface BackButtonProps {
    title: string
    href?: string
}

export const BackButton: FC<BackButtonProps> = ({ title, href }) => {
    const router = useRouter()
    const handleOnClick = () => !href ? router.back() : router.push(href)
    return (
        <div className='d-if cup' onClick={handleOnClick}>
            <img src='/static/back-arrow.svg' alt='Back' className='mr-10' />
            <h3>{title}</h3>
        </div>
    )
}
