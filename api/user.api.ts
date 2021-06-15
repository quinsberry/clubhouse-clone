import { AxiosInstance } from 'axios'

export const UserApi = (instance: AxiosInstance) => {
    return {
        getMe: async (): Promise<unknown> => {
            const { data } = await instance.get<unknown>('/auth/me')
            return data
        },
        getUserInfo: async (id: number): Promise<unknown> => {
            const { data } = await instance.get('/users/' + id)
            return data
        },
        uploadAvatar: async (photoFile: File): Promise<unknown> => {
            const formData = new FormData()
            formData.append('photo', photoFile)
            const { data } = await instance.post('/upload/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data
        },
    }
}
