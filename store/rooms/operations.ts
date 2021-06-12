import { createAsyncThunk } from '@reduxjs/toolkit'
import { Room } from '@api/room.api'
import { $RoomType } from '@generated/AppModels'
import { ClientService } from '@services/clientService'
import { assertType } from '@tps/guards.types'
import { isRoom } from '@utils/entitiesCheckers'

export const fetchCreateRoom = createAsyncThunk<Room, { title: string; type: $RoomType }>(
    'rooms/fetchCreateRoomStatus',
    async ({ title, type }) => {
        try {
            const room = await ClientService().createRoom({
                title,
                type,
            })
            assertType<Room>(room, room => isRoom(room))

            return room
        } catch (error) {
            throw Error('Creating room error')
        }
    },
)

export default {
    fetchCreateRoom,
}