const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const userM = require('../models/user.M');
const bcrypt = require('bcrypt');

module.exports = app => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            let user;
            try {
                user = await userM.get(username);                
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                const challengeResult = await bcrypt.compare(password, user.f_Password);
                if (!challengeResult) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async (user, done) => { 
        try {
            console.log('user: ', user);
            const user1 = await userM.get(user.f_Username);
            done(null, user1);
        } catch (error) {
            // new Error sẽ crash app ngay lập tức => dễ handle lỗi 
            done(new Error('deserializeUser error'), null);
        }
    });

    app.use(passport.initialize());
    app.use(passport.session());
};