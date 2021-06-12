import fs from 'fs'
import sharp from 'sharp'
import { Request, Response } from 'express'

class UploadController {
    avatar(req: Request, res: Response) {
        const filePath = req.file.path
        const fileNameParts = req.file.path.split('.')
        const fileExtension = '.' + fileNameParts[fileNameParts.length - 1]
        sharp(filePath)
            .resize(150, 150)
            .toFormat('jpeg')
            .toFile(filePath.replace(fileExtension, '.jpeg'), (err) => {
                if (err) {
                    throw err
                }

                fs.unlinkSync(filePath)

                res.json({
                    url: `/avatars/${req.file.filename.replace(fileExtension, '.jpeg')}`,
                })
            })

    }
}

export const UploadCtrl = new UploadController()
