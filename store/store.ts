import { combineReducers, configureStore, Store } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { roomsReducer } from '@store/rooms/slice'
import { userReducer } from '@store/user/slice'
import { AppState } from '@store/types'


const rootReducer = combineReducers({
    rooms: roomsReducer,
    user: userReducer,
})

const makeStore = (): Store<AppState> =>
    configureStore({
        reducer: rootReducer,
    })

export const storeWrapper = createWrapper(makeStore, { debug: true })
