import { slice as userSlice, UserSliceState } from '@store/user/slice'
import { RoomsSliceState, slice as roomsSlice } from '@store/rooms/slice'
import { Dispatch } from '@reduxjs/toolkit'

export type AppDispatch = Dispatch<ActionsTypes>

export interface AppState {
    user: typeof UserSliceState
    rooms: typeof RoomsSliceState
}

const actions = {
    ...userSlice.actions,
    ...roomsSlice.actions,
}

type InferActions<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
type ActionsTypes = InferActions<typeof actions>

