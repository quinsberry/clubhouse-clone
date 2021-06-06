import jwt from 'jsonwebtoken'
import { UserData } from '@pages/index'

export const createJwtToken = (user: UserData): string => {
    return jwt.sign(
        {
            data: user,
        },
        process.env.JWT_SECRET_KEY || '',
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm: 'HS256',
        },
    )
}
