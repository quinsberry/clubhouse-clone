import passport from 'passport'
import { Strategy as GithubStrategy } from 'passport-github'
// @ts-ignore It need to change to ts
import { User } from '../database/models'

passport.use('github', <passport.Strategy>new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
    },
    async (_, __, profile, done) => {
        try {
            let userData: any // UserData

            const userObj: any = { // Omit<UserData, 'id'>
                fullname: profile.displayName ?? profile.name,
                avatarUrl: profile.photos?.[0].value,
                isActive: 0,
                username: profile.username,
                phone: '',
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

            console.log(userData)
            done(null, {
                ...userData,
                // token: createJwtToken(userData),
            })
        } catch (err) {
            done(err)
        }
    },
))

passport.serializeUser(function(user, done) {
    // @ts-ignore User problem
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        err ? done(err) : done(null, user)
    })
})


export { passport }