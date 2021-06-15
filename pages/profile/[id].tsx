import { Header } from '@components/Header'
import { Profile } from '@components/Profile'
import { GetServerSideProps, NextPage } from 'next'
import { storeWrapper } from '@store/store'
import { checkAuth } from '@utils/checkAuth'
import { ClientService } from '@services/clientService'
import { assertType } from '@utils/type-guards'
import { UserData } from '@pages/index'
import { isUserData } from '@utils/entitiesCheckers'

interface ProfilePageProps {
    profileData?: UserData
}

const ProfilePage: NextPage<ProfilePageProps> = ({ profileData }) => {
    return !profileData ? null : (
        <>
            <Header />
            <div className='container mt-30'>
                <Profile
                    avatarUrl={profileData.avatarUrl}
                    fullname={profileData.fullname}
                    username={profileData.username}
                    about='Test info'
                />
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = storeWrapper.getServerSideProps(
    store => async ctx => {
        try {
            const user = await checkAuth(ctx, store)

            const userId = ctx.query.id
            if (userId) {
                const profileData = await ClientService(ctx).getUserInfo(Number(userId))
                assertType<UserData>(profileData, data => isUserData(data))

                if (!user || !profileData) {
                    return {
                        redirect: {
                            permanent: false,
                            destination: '/',
                        },
                    }
                }

                return {
                    props: {
                        profileData,
                    },
                }
            }

            return {
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            }
        } catch (error) {
            console.log(`Profile page, ${error.response.status}: ${error.response.statusText}`)
            return {
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            }
        }
    })

export default ProfilePage
