import { Router } from 'express'
import { RoomCtrl } from '@server/controllers/room.controller'
import { passport } from '@server/core/passport.core'

export const roomRoutes = Router()

roomRoutes.get('', passport.authenticate('jwt', { session: false }), RoomCtrl.index)
roomRoutes.post('', passport.authenticate('jwt', { session: false }), RoomCtrl.create)
roomRoutes.get('/:id', passport.authenticate('jwt', { session: false }), RoomCtrl.show)
roomRoutes.delete('/:id', passport.authenticate('jwt', { session: false }), RoomCtrl.delete)
