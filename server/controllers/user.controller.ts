import { Request, Response } from 'express'
// @ts-ignore Import models from js file
import { User } from '@server/database/models'


class UserController {
    async getUserInfo(req: Request, res: Response) {
        const userId = req.params.id

        try {
            const findUser = await User.findByPk(userId)

            if (findUser) {
                res.status(200).json(findUser)
            } else {
                res.status(404).json({
                    message: 'User not found',
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'Server internal error',
            })
        }
    }
}

export const UserCtrl = new UserController()
