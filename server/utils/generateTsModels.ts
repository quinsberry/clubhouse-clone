import * as fs from 'fs'
import * as path from 'path'

// TODO: Make creating of this content automatic too (use models files)
const modelsContent = `
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
    createdAt: Date
    updatedAt: Date
}

export interface $User {
    id: number
    fullname: string
    avatarUrl: string | null
    isActive: number
    username: string | null
    phone: string | null
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

        fs.writeFileSync(path.join(folderPath, fileName), generateContent(getAdditionalTypesFromServer()))
        console.log('AppModel was generated successfully')
    } catch (error) {
        console.log('App model generating error: \n', error)
    }
}

function generateContent(additionalContent: string) {
    const title =
`
/*
 * Generator-Maintained File
 * TypeScript representation of server side models being used
 * Note: $ is appended to the names of all classes. This is to differentiate from client side naming
 * DO NOT MANUALLY EDIT THIS FILE.
 */
`
    return `
    ${title}
    ${additionalContent}
    ${modelsContent}
    `
}

function getAdditionalTypesFromServer() {
    const clientTypesFilePath = path.resolve(__dirname, '..', 'types', 'client.types.ts')
    const typesForClient = fs.readFileSync(clientTypesFilePath)

    const result =
`
${typesForClient}
`
    return result
}