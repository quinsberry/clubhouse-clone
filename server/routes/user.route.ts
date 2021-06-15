import { Router } from 'express'
import { passport } from '@server/core/passport.core'
import { UserCtrl } from '@server/controllers/user.controller'

export const usersRoutes = Router()

usersRoutes.get('/:id', passport.authenticate('jwt', { session: false }), UserCtrl.getUserInfo)
