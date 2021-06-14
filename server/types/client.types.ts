export enum $ClientSocketApi {
    JOIN = 'CLIENT@ROOMS:JOIN',
    CALL = 'CLIENT@ROOMS:CALL',
    ANSWER = 'CLIENT@ROOMS:ANSWER',
}

export enum $ServerSocketApi {
    JOIN = 'SERVER@ROOMS:JOIN',
    CALL = 'SERVER@ROOMS:CALL',
    ANSWER = 'SERVER@ROOMS:ANSWER',
    HOME = 'SERVER@ROOMS:HOME',
    LEAVE = 'SERVER@ROOMS:LEAVE',
}

export enum $CookieKeys {
    TOKEN = 'clubhstoken',
}

export enum $RoomType {
    Open = 'open',
    Social = 'social',
    Closed = 'closed',
}