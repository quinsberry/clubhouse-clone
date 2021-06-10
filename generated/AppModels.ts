
/*
 * Generator-Maintained File
 * TypeScript representation of server side models being used
 * Note: $ is appended to the names of all classes. This is to differentiate from client side naming
 * DO NOT MANUALLY EDIT THIS FILE.
 */
 
 
export enum $CookieKeys {
    TOKEN = 'clubhstoken',
}

export enum $RoomType {
    Open = 'open',
    Social = 'social',
    Closed = 'closed',
}


export interface $Code {
    id: number
    code: string
    user_id: number
    createdAt: Date
    updatedAt: Date
}

export interface $Room {
    id: number
    title: string
    type: $RoomType
    speakers: any[]
    listenersCount: number
}

export interface $User {
    id: number
    fullname: string
    avatarUrl: string
    isActive: number
    username: string
    phone: string
    createdAt: Date
    updatedAt: Date
}
