import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Header } from '@components/Header'
import { Button } from '@components/common/Button'
import { ConversationCard } from '@components/ConversationCard'
import { checkAuth } from '@utils/checkAuth'

export default function RoomsPage({ rooms = [] }) {
    return (
        <>
            <Header />
            <div className='container'>
                <div className=' mt-40 d-flex align-items-center justify-content-between'>
                    <h1>All conversations</h1>
                    <Button color='green'>+ Start room</Button>
                </div>
                <div className='grid gap-50 mt-30'>
                    {rooms.map((obj) => (
                        <Link key={obj.id} href={`/rooms/${obj.id}`}>
                            <a className='d-flex'>
                                <ConversationCard
                                    title={obj.title}
                                    avatars={obj.avatars}
                                    guests={obj.guests}
                                    guestsCount={obj.guestsCount}
                                    speakersCount={obj.speakersCount}
                                />
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const user = await checkAuth(ctx)

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
        console.error('RoomsPage/getServerSideProps error:\n', error)
        return {
            props: {
                rooms: [],
            },
        }
    }
}

