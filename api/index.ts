import { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import { CookieKeys } from '@tps/global.types'
import { BASE_URL } from '@core/axios'
import { UserApi } from '@api/user.api'

type ApiReturnType = ReturnType<typeof UserApi>

export const Api = (ctx: GetServerSidePropsContext): ApiReturnType => {
    const token = ctx.req.cookies[CookieKeys.TOKEN]

    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            cookie: `${[CookieKeys.TOKEN]}=${token}`,
        },
    })

    return [UserApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType)
}
