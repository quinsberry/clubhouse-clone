import { Room, UserDataWithRoomId } from '@api/room.api'
import { UserData } from '@pages/index'
import { validateFirstElementInList } from '@utils/type-guards'

export const isUserData = (entry: any): entry is UserData => {
    return entry != null
        && typeof entry === 'object'
        && typeof entry.id === 'number'
        && typeof entry.fullname === 'string'
        && typeof entry.avatarUrl === 'string'
        && typeof entry.isActive === 'number'
        && typeof entry.username === 'string'
        && typeof entry.phone === 'string'
}

export const isUserDataWithRoomId = (entry: any): entry is UserDataWithRoomId => {
    return entry != null
        && typeof entry === 'object'
        && typeof entry.roomId === 'number'
        && isUserData(entry)
}

export const isRoom = (entry: any): entry is Room => {
    return entry != null
        && typeof entry === 'object'
        && typeof entry.id === 'number'
        && typeof entry.title === 'string'
        && typeof entry.type === 'string'
        && typeof entry.speakers === 'object'
        && validateFirstElementInList(entry.speakers, isUserDataWithRoomId)
        && typeof entry.listenersCount === 'number'
}