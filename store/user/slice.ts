import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { UserData } from '@pages/index'
import { AppState } from '@store/types'

export const UserSliceState = {
    data: null as UserData | null,
}

export const slice = createSlice({
    name: 'user',
    initialState: UserSliceState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.data = action.payload
        },
    },
    extraReducers: (builder) =>
        builder.addCase(HYDRATE as any, (state, action: PayloadAction<AppState>) => {
            state.data = action.payload.user.data
        }),
})

export const { setUserData } = slice.actions
export const userReducer = slice.reducer
