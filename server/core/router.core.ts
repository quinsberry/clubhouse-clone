import { Express, Response } from 'express'
import { authRoutes } from '@server/routes/auth.route'
import { uploadRoutes } from '@server/routes/upload.route'


export const createRouter = (app: Express) => {
    app.get('/', (_, res: Response) => res.send('It works'))
    app.use('/auth', authRoutes)
    app.use('/upload', uploadRoutes)
}