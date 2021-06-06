import { AxiosInstance } from 'axios'
import { assertType } from '@tps/guards.types'
import { UserData } from '@pages/index'

export const UserApi = (instance: AxiosInstance) => {
    return {
        getMe: async (): Promise<UserData> => {
            try {
                const { data } = await instance.get<unknown>('/auth/me')
                assertType<UserData>(data, data => typeof data.id === 'number' && typeof data.isActive === 'number')
                return data
            } catch (err) {
                console.log('getMe fetching error')
            }
        },
    }
}
