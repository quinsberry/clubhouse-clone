import { UserData } from '@pages/index'
import { GetServerSidePropsContext } from 'next'
import { assertType } from '@tps/guards.types'
import { ClientService } from '@services/clientService'

export const checkAuth = async (ctx: GetServerSidePropsContext): Promise<UserData | null> => {
    try {
        const data = await ClientService(ctx).getMe()
        assertType<UserData>(data, data => typeof data.id === 'number' && typeof data.isActive === 'number')
        return data
    } catch (err) {
        return null
    }
}
