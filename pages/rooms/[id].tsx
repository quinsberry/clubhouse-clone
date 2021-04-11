import { GetServerSideProps } from 'next'
import { Header } from '@components/Header'
import { Room } from '@components/Room'
import { BackButton } from '@components/common/BackButton'
import { Axios } from '@core/axios'

export default function RoomPage({ room }) {
    return (
        <>
            <Header />
            <div className='container mt-40'>
                <BackButton title='All rooms' href='/rooms' />
            </div>
            <Room title={room.title} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const { data } = await Axios.get('/rooms.json')
        const roomId = ctx.query.id
        const room = data.find((obj) => obj.id === roomId)
        return {
            props: {
                room,
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
