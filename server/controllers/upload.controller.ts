import fs from 'fs'
import sharp from 'sharp'

class UploadController {
    avatar(req, res) {
        const filePath = req.file.path
        sharp(filePath)
            .resize(150, 150)
            .toFormat('jpeg')
            .toFile(filePath.replace('.png', '.jpeg'), (err) => {
                if (err) {
                    throw err
                }

                fs.unlinkSync(filePath)

                res.json({
                    url: `/avatars/${req.file.filename.replace('.png', '.jpeg')}`,
                })
            })

    }
}

export const UploadCtrl = new UploadController()
