import { Request, Response } from 'express'
import cookie from 'cookie'
// @ts-ignore Import models from js file
import { Code, User } from '@server/database/models'
import { omit } from '@server/utils/helpers'
import { $CookieKeys } from '@server/types/client.types'
// import axios from 'axios'
// import { generateRandomCode } from '@server/utils/generateRandomCode'


class AuthController {
    getMe(req: Request, res: Response) {
        res.status(200).json(omit(req.user!, 'token'))
    }

    githubCallback(req: Request, res: Response) {
        res.set(
            'Set-Cookie',
            cookie.serialize($CookieKeys.TOKEN, req.user!.token!, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            }),
        )
        res.send(
            `<script>window.opener.postMessage('${JSON.stringify(
                omit(req.user!, 'token'),
            )}', '*');window.close();</script>`,
        )
    }

    async activate(req: Request, res: Response) {
        const userId = req.user!.id
        const { code, user } = req.body

        if (!code) {
            return res.status(400).json({ message: 'Enter activation code' })
        }

        const whereQuery = { code, user_id: userId }

        try {
            const findCode = await Code.findOne({
                where: whereQuery,
            })

            if (findCode) {
                await Code.destroy({
                    where: whereQuery,
                })
                await User.update({ ...user, isActive: 1 }, { where: { id: userId } })
                return res.status(200).send()
            } else {
                res.status(404).json({
                    message: 'Code not found',
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Account activation error',
            })
        }
    }


    async sendSMS(req: Request, res: Response) {
        const phone = req.query.phone
        const userId = req.user!.id
        // const smsCode = generateRandomCode()
        const smsCode = 1234

        if (!phone) {
            return res.status(400).json({
                message: 'Phone number not found',
            })
        }

        try {
            // await axios.get(
            //   `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=${phone}&msg=${smsCode}`,
            // );

            const findCode = await Code.findOne({
                where: {
                    user_id: userId,
                },
            })

            if (findCode) {
                await Code.update({ code: smsCode, user_id: userId }, { where: { id: userId } })
            } else {
                await Code.create({
                    code: smsCode,
                    user_id: userId,
                })
            }


            res.status(200).send()
        } catch (error) {
            res.status(500).json({
                message: 'Sending sms-code error',
            })
        }
    }

}

export const AuthCtrl = new AuthController()
