import { GetServerSideProps } from 'next'
import { Header } from '@components/Header'
import { Room as RoomComponent } from '@components/Room'
import { BackButton } from '@components/common/BackButton'
import { Room } from '@api/room.api'
import { ClientService } from '@services/clientService'
import { assertType } from '@tps/guards.types'
import { isRoom } from '@utils/entitiesCheckers'

export default function RoomPage({ room }: { room?: Room }) {
    return (
        <>
            <Header />
            <div className='container mt-40'>
                <BackButton title='All rooms' href='/rooms' />
            </div>
            {!room ? null : <RoomComponent title={room.title} />}
        </>
    )
}

export const getServerSideProps: GetServerSideProps<{ room: Room }> = async (ctx) => {
    try {
        const roomId = ctx.query.id as string
        const room = await ClientService(ctx).getRoom(roomId)
        assertType<Room>(room, room => isRoom(room))

        return {
            props: {
                room,
            },
        }
    } catch (error) {
        console.log(`Room page, ${error.response.status}: ${error.response.statusText}`)
        return {
            props: {},
            redirect: {
                permanent: false,
                destination: '/rooms',
            },
        }
    }
}
