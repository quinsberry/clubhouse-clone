import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Header } from '@components/Header'
import { Button } from '@components/common/Button'
import { ConversationCard } from '@components/ConversationCard'
import { checkAuth } from '@utils/checkAuth'
import { useEffect, useState } from 'react'
import { StartRoomModal } from '@components/StartRoomModal'
import { ClientService } from '@services/clientService'
import { Room } from '@api/room.api'
import { assertType, validateFirstElementInList } from '@utils/type-guards'
import { isRoom } from '@utils/entitiesCheckers'
import { storeWrapper } from '@store/store'
import { setRooms, setRoomSpeakers } from '@store/rooms/slice'
import { useTypedDispatch, useTypedSelector } from '@hooks/useReduxHooks'
import { selectRooms } from '@store/rooms/selectors'
import { useSocket } from '@hooks/userSocket'
import { $ServerSocketApi } from '@generated/AppModels'

interface RoomsPageProps {
    rooms: Room[]
}

const RoomsPage: NextPage<RoomsPageProps> = () => {
    const [visibleModal, setVisibleModal] = useState(false)
    const rooms = useTypedSelector(selectRooms)
    const dispatch = useTypedDispatch()
    const socket = useSocket()

    useEffect(() => {
        const refetchRooms = async () => {
            const rooms = await ClientService().getRooms()
            assertType<Room[]>(rooms, rooms => validateFirstElementInList(rooms, isRoom))
            dispatch(setRooms(rooms))
        }
        refetchRooms()
        socket.on($ServerSocketApi.HOME, ({ roomId, speakers }) => {
            dispatch(setRoomSpeakers({ speakers, roomId }))
        })
    }, [])

    return (
        <>
            <Header />
            <div className='container'>
                <div className=' mt-40 d-flex align-items-center justify-content-between'>
                    <h1>All conversations</h1>
                    <Button onClick={() => setVisibleModal(true)} color='green'>+ Start room</Button>
                </div>
                {visibleModal && <StartRoomModal onClose={() => setVisibleModal(false)} />}
                <div className='grid gap-50 mt-30'>
                    {rooms.map((room) => (
                        <Link key={room.id} href={`/rooms/${room.id}`}>
                            <a className='d-flex'>
                                <ConversationCard
                                    title={room.title}
                                    speakers={room.speakers}
                                    listenersCount={room.listenersCount}
                                />
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = storeWrapper.getServerSideProps(
    store => async ctx => {
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

            const rooms = await ClientService(ctx).getRooms()
            assertType<Room[]>(rooms, rooms => validateFirstElementInList(rooms, isRoom))
            store.dispatch(setRooms(rooms))

            return {
                props: {},
            }
        } catch (error) {
            console.error('RoomsPage/getServerSideProps error:\n', error)
            return {
                props: {},
            }
        }
    })

export default RoomsPage
