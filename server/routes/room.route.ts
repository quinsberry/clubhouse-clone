import { Router } from 'express'
import { RoomCtrl } from '@server/controllers/room.controller'
import { passport } from '@server/core/passport.core'

export const roomRoutes = Router()

roomRoutes.get('/rooms', passport.authenticate('jwt', { session: false }), RoomCtrl.index)
roomRoutes.post('/rooms', passport.authenticate('jwt', { session: false }), RoomCtrl.create)
roomRoutes.get('/rooms/:id', passport.authenticate('jwt', { session: false }), RoomCtrl.show)
roomRoutes.delete('/rooms/:id', passport.authenticate('jwt', { session: false }), RoomCtrl.delete)
