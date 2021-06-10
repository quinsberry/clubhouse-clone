import * as fs from 'fs'
import * as path from 'path'

const additionalContent = `
export enum $CookieKeys {
    TOKEN = 'clubhstoken',
}

export enum $RoomType {
    Open = 'open',
    Social = 'social',
    Closed = 'closed',
}
`

// TODO: Make creating of this content automatic (use models files)
const generatedContent = `
/*
 * Generator-Maintained File
 * TypeScript representation of server side models being used
 * Note: $ is appended to the names of all classes. This is to differentiate from client side naming
 * DO NOT MANUALLY EDIT THIS FILE.
 */
 
 ${additionalContent}

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
`

export const generateTsModels = () => {
    try {
        const fileName = 'AppModels' + '.ts'
        const folderPath = path.resolve(__dirname, '..', '..', 'generated')
        const filePath = path.resolve(__dirname, '..', '..', 'generated', fileName)
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true })
        }
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        fs.writeFileSync(path.join(folderPath, fileName), generatedContent)
        console.log('AppModel was generated successfully')
    } catch (error) {
        console.log('App model generating error: \n', error)
    }
}