import { Router } from 'express'
import { passport } from '../core/passport.core'
import { AuthCtrl } from '../controllers/auth.controller'

export const authRoutes = Router()


authRoutes.get('/github', passport.authenticate('github'))
authRoutes.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    AuthCtrl.githubCallback
)