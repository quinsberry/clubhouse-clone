import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Axios } from '@core/axios'
import { Header } from '@components/Header'
import { Button } from '@components/common/Button'
import { ConversationCard } from '@components/ConversationCard'

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

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data } = await Axios.get('/rooms.json')
        return {
            props: {
                rooms: data,
            },
        }
    } catch (error) {
        console.log('ERROR!')
        return {
            props: {
                rooms: [],
            },
        }
    }
}
