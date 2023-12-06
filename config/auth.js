const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, { message: 'Invalid email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, true)
            } else {
                return done(null, false, { message: 'Password invalid' })
            }
        } catch (e) {
        
        }
    }
    passport.use(new localStrategy({ usernameField: 'email' },
    authenticateUser))
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((id, done) => { })
}

module.exports = initialize