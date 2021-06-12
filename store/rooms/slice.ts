import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Room } from '@api/room.api'
import { AppState } from '@store/types'
import { fetchCreateRoom } from '@store/rooms/operations'

export const RoomsSliceState = {
    items: [] as Room[],
}

export const slice = createSlice({
    name: 'rooms',
    initialState: RoomsSliceState,
    reducers: {
        setRooms: (state, action: PayloadAction<Room[]>) => {
            state.items = action.payload
        },
        setRoomSpeakers: (
            state,
            action: PayloadAction<{ speakers: Room['speakers']; roomId: number }>,
        ) => {
            state.items = state.items.map((room) => {
                if (room.id === action.payload.roomId) {
                    room.speakers = action.payload.speakers
                }
                return room
            })
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchCreateRoom.fulfilled.type, (state, action: PayloadAction<Room>) => {
                state.items.push(action.payload)
            })
            .addCase(HYDRATE as any, (state, action: PayloadAction<AppState>) => {
                state.items = action.payload.rooms.items
            }),
})

export const { setRooms, setRoomSpeakers } = slice.actions
export const roomsReducer = slice.reducer
