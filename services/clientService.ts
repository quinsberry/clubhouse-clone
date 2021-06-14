import { GetServerSidePropsContext } from 'next'
import axios, { AxiosInstance } from 'axios'
import { SERVER_URL } from '@core/axios'
import { UserApi } from '@api/user.api'
import { Axios } from '@core/axios'
import { AuthApi } from '@api/auth.api'
import { RoomApi } from '@api/room.api'
import { $CookieKeys } from '@generated/AppModels'

type ClientServiceEndpoints =
    & ReturnType<typeof UserApi>
    & ReturnType<typeof AuthApi>
    & ReturnType<typeof RoomApi>

export const ClientService = (ctx?: GetServerSidePropsContext): ClientServiceEndpoints => {
    let instance: AxiosInstance

    if (ctx) {
        const token = ctx.req.cookies[$CookieKeys.TOKEN]

        instance = axios.create({
            baseURL: SERVER_URL,
            headers: {
                cookie: `${[$CookieKeys.TOKEN]}=${token}`,
            },
        })
    } else {
        instance = Axios
    }

    return [UserApi, AuthApi, RoomApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ClientServiceEndpoints)
}