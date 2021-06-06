import { Router } from 'express'
import { passport } from '@server/core/passport.core'
import { AuthCtrl } from '@server/controllers/auth.controller'

export const authRoutes = Router()

authRoutes.get('/me', passport.authenticate('jwt', { session: false }), AuthCtrl.getMe)
authRoutes.get('/github', passport.authenticate('github'))
authRoutes.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    AuthCtrl.githubCallback,
)
authRoutes.get('/sms', passport.authenticate('jwt', { session: false }), AuthCtrl.sendSMS)
authRoutes.post(
    '/sms/activate',
    passport.authenticate('jwt', { session: false }),
    AuthCtrl.activate,
)
