import { useRouter } from 'next/router'
import { Header } from '@components/Header'
import { Profile } from '@components/Profile'
import { GetServerSideProps } from 'next'
import { storeWrapper } from '@store/store'
import { checkAuth } from '@utils/checkAuth'

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

export const getServerSideProps: GetServerSideProps = storeWrapper.getServerSideProps(store => async ctx => {
    try {
        const user = await checkAuth(ctx, store)
        if (!user) {
            return {
                props: {},
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            }
        }

        return {
            props: {},
        }
    } catch (error) {
        console.log(`Profile page, ${error.response.status}: ${error.response.statusText}`)
        return {
            props: {},
            redirect: {
                permanent: false,
                destination: '/',
            },
        }
    }
})
