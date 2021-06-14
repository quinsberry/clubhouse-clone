import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config({
    path: 'server/.env',
})
import { passport } from '@server/core/passport.core'
import '@server/core/db.core'
import { createRouter } from '@server/core/router.core'
import { generateTsModels } from '@server/utils/generateTsModels'
import { initSocket } from '@server/core/socket.core'

const expressApp = express()

expressApp.use(express.json())
expressApp.use(cors({ credentials: true, origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }))
expressApp.use(passport.initialize())



const PORT = process.env.PORT || 3001

async function start() {
    try {
        createRouter(expressApp)
        generateTsModels()

        const server = expressApp.listen(PORT, (): void => {
            console.log(`Server running at port: ${PORT}`)
        })

        initSocket(server)
    } catch (e) {
        console.log(`Starting error: ${e.message}`)
        process.exit(1)
    }
}

start()
