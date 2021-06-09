import { UserData } from '@pages/index'
import { GetServerSidePropsContext } from 'next'
import { assertType } from '@tps/guards.types'
import { ClientService } from '@services/clientService'
import { isUserData } from '@utils/entitiesCheckers'

export const checkAuth = async (ctx: GetServerSidePropsContext): Promise<UserData | null> => {
    try {
        const data = await ClientService(ctx).getMe()
        assertType<UserData>(data, _ => isUserData(_))
        return data
    } catch (err) {
        return null
    }
}
