import { GetServerSidePropsContext } from 'next'
import { CookieKeys } from '@tps/global.types'
import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from '@core/axios'
import { UserApi } from '@api/user.api'
import { Axios } from '@core/axios'
import { AuthApi } from '@api/auth.api'

type ApiReturnType =
    & ReturnType<typeof UserApi>
    & ReturnType<typeof AuthApi>

export const ClientService = (ctx?: GetServerSidePropsContext) => {
    let instance: AxiosInstance

    if (ctx) {
        const token = ctx.req.cookies[CookieKeys.TOKEN]

        instance = axios.create({
            baseURL: BASE_URL,
            headers: {
                cookie: `${[CookieKeys.TOKEN]}=${token}`,
            },
        })
    } else {
        instance = Axios
    }

    return [UserApi, AuthApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType)
}