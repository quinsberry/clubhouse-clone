import { useRouter } from 'next/router'
import { Header } from '@components/Header'
import { Profile } from '@components/Profile'

export default function ProfilePage() {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <Header />
            <div className="container mt-30">
                <Profile
                    avatarUrl="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    fullname="Name Surname"
                    username="username"
                    about="Test info"
                />
            </div>
        </>
    )
}
