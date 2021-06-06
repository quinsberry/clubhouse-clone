import { AxiosInstance } from 'axios'

export const UserApi = (instance: AxiosInstance) => {
    return {
        getMe: async (): Promise<unknown> => {
            const { data } = await instance.get<unknown>('/auth/me')
            return data
        },
    }
}
