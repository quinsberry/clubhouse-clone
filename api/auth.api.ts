import { AxiosInstance } from 'axios'
import { UserData } from '@pages/index'

export const AuthApi = (instance: AxiosInstance) => {
    return {
        sendActivationSms: async (phone: string): Promise<unknown> => {
            const { data } = await instance.get<unknown>(`/auth/sms?phone=${phone}`)
            return data
        },
        sendActivationCode: async (dto: { user: UserData, code: string }): Promise<unknown> => {
            const { data } = await instance.post<unknown>(`/auth/sms/activate`, dto)
            return data
        },
    }
}
