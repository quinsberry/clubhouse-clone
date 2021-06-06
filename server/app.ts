import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config({
    path: 'server/.env',
})
import { passport } from '@server/core/passport.core'
import '@server/core/db.core'
import { createRouter } from '@server/core/router.core'



const app = express()
app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }))
app.use(passport.initialize())

createRouter(app)

const PORT = process.env.PORT || 3001

async function start() {
    try {
        app.listen(PORT, (): void => {
            console.log(`Server running at port: ${PORT}`)
        })
    } catch (e) {
        console.log(`Starting error: ${e.message}`)
        process.exit(1)
    }
}

start()
