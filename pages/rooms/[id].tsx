import { GetServerSideProps } from 'next'
import { Header } from '@components/Header'
import { Room as RoomComponent } from '@components/Room'
import { BackButton } from '@components/common/BackButton'
import { Room } from '@api/room.api'
import { ClientService } from '@services/clientService'
import { assertType } from '@utils/type-guards'
import { isRoom } from '@utils/entitiesCheckers'
import { checkAuth } from '@utils/checkAuth'
import { storeWrapper } from '@store/store'
import { FC } from 'react'

interface RoomPageProps {
    room?: Room
}

const RoomPage: FC<RoomPageProps> = ({ room }) => {
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

export const getServerSideProps: GetServerSideProps<RoomPageProps> = storeWrapper.getServerSideProps(store => async ctx => {
    try {
        const user = await checkAuth(ctx, store)
        if (!user) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/',
                },
            }
        }

        const roomId = ctx.query.id as string
        const room = await ClientService(ctx).getRoom(roomId)
        console.log(room)
        assertType<Room>(room, room => isRoom(room))

        return {
            props: {
                room,
            },
        }
    } catch (error) {
        console.log(`Room page, ${error.response.status}: ${error.response.statusText}`)
        return {
            redirect: {
                permanent: false,
                destination: '/rooms',
            },
        }
    }
})

export default RoomPage
