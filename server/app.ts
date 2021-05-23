import dotenv from 'dotenv'
dotenv.config({
    path: 'server/.env',
})
import express, { Response } from 'express'
import { authRoutes } from './routes/auth.route'
import { passport } from './core/passport.core'
import './core/db.core'


const app = express()
app.use(passport.initialize())

app.get('/', (_, res: Response) => res.send('It works'))
app.use('/auth', authRoutes)

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
