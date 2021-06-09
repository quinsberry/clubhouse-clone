import { AxiosInstance } from 'axios'
import { UserData } from '@pages/index'

export type UserDataWithRoomId = UserData & { roomId: number }

export interface Room {
    id: number
    title: string
    type: RoomType
    speakers: UserDataWithRoomId[]
    listenersCount: number
}

export enum RoomType {
    Open = 'open',
    Social = 'social',
    Closed = 'closed',
}

export const RoomApi = (instance: AxiosInstance) => {
    return {
        getRooms: async (): Promise<unknown> => {
            const { data } = await instance.get('/rooms')
            return data
        },
        getRoom: async (id: string): Promise<unknown> => {
            const { data } = await instance.get(`/rooms/${id}`)
            return data
        },
        createRoom: async (form: { title: string; type: RoomType }): Promise<unknown> => {
            const { data } = await instance.post('/rooms', form)
            return data
        },
        deleteRoom: async (id: number): Promise<void> => instance.delete(`/rooms/${id}`),
    }
}
