import { UserData } from '@pages/index'
import { GetServerSidePropsContext } from 'next'
import { assertType } from '@tps/guards.types'
import { ClientService } from '@services/clientService'
import { isUserData } from '@utils/entitiesCheckers'
import { Store } from '@reduxjs/toolkit'
import { setUserData } from '@store/user/slice'
import { AppState } from '@store/types'

export const checkAuth = async (ctx: GetServerSidePropsContext, store: Store<AppState>): Promise<UserData | null> => {
    try {
        const user = await ClientService(ctx).getMe()
        assertType<UserData>(user, user => isUserData(user))
        store.dispatch(setUserData(user))
        return user
    } catch (err) {
        return null
    }
}
