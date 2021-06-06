import { UserData } from '@pages/index'
import { Api } from '@api/index'
import { GetServerSidePropsContext } from 'next'

export const checkAuth = async (ctx: GetServerSidePropsContext): Promise<UserData | null> => {
    return await Api(ctx).getMe() ?? null
}
