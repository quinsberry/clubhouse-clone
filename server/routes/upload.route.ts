import { Router } from 'express'
import { UploadCtrl } from '@server/controllers/upload.controller'
import { uploader } from '@server/core/uploader.core'

export const uploadRoutes = Router()

uploadRoutes.post('/avatar', uploader.single('photo'), UploadCtrl.avatar)