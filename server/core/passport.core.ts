import passport from 'passport'
import { Request } from 'express'
import { Strategy as GithubStrategy } from 'passport-github'
import { Strategy as JwtStrategy } from 'passport-jwt'
import cookie from 'cookie'
import { UserData } from '@pages/index'
import { createJwtToken } from '@server/utils/createJwtToken'
import { $CookieKeys } from '@server/types/client.types'
// @ts-ignore Import model from js file
import { User } from '@server/database/models'

const cookieExtractor = (req: Request) => {
    let token = null
    if (req && req.headers.cookie) {
        token = cookie.parse(req.headers.cookie)[$CookieKeys.TOKEN]
    }
    return token
}

const opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET_KEY,
}

passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
        done(null, jwt_payload.data)
    }),
)


passport.use('github', <passport.Strategy>new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID ?? '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
        callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
    },
    async (_, __, profile, done) => {
        try {
            let userData: UserData

            const userObj: Omit<UserData, 'id' | 'createdAt' | 'updatedAt' | 'token'> = {
                fullname: profile.displayName,
                avatarUrl: profile.photos?.[0].value ?? null,
                isActive: 0,
                username: profile.username ?? null,
                phone: null,
            }

            const findUser = await User.findOne({
                where: {
                    username: userObj.username,
                },
            })

            if (!findUser) {
                const user = await User.create(userObj)
                userData = user.toJSON()
            } else {
                userData = await findUser.toJSON()
            }

            done(null, {
                ...userData,
                token: createJwtToken(userData),
            })
        } catch (err) {
            done(err)
        }
    },
))

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err: any, user: any) {
        err ? done(err) : done(null, user)
    })
})


export { passport }