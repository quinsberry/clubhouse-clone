import { UserData } from '@pages/index'

export type SocketRoom = Record<string, { roomId: number; user: UserData }>

export const getUsersFromTheRoom = (rooms: SocketRoom, roomId: number) =>
    Object.values(rooms)
        .filter((obj) => obj.roomId === roomId)
        .map((obj) => ({ ...obj.user, roomId: Number(roomId) }))
