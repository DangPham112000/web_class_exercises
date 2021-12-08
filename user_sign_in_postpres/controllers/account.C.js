const router = require('express').Router();
const userM = require('../models/user.M');
const shajs = require('sha.js');
const SHA_LENGTH = 64;

router.get('/signin', async (req, res) => {
    // const users = await userM.all();
    // console.log(users);
    console.log(req.cookies.username);
    if (req.cookies.username) {
        res.redirect('/');
        return;
    }
    res.render('account/signin', {
        cssP: () => 'css',
        scriptP: () => 'empty',
        navP: () => 'nav',
        footerP: () => 'footer',
    });
});

router.get('/signup', (req, res) => {
    if (req.session.user) {
        res.redirect('/');
        return;
    }
    res.render('account/signup', {
        cssP: () => 'css',
        scriptP: () => 'empty',
        navP: () => 'nav',
        footerP: () => 'footer',
        
    });
});

router.post('/signup', async (req, res) => {
    const newUser = {
        f_Username: req.body.username,
        f_Password: req.body.password,
        f_Name: req.body.name,
        f_Email: req.body.email,
        f_DOB: req.body.dob,
        f_Permission: 0,
    }
    const oldUser = await userM.get(newUser.f_Username);
    if (oldUser) {
        res.redirect('./signin');
        return;
    }
    const salt = Date.now().toString(16);
    newUser.f_Password = shajs('sha256').update(newUser.f_Password + salt).digest('hex') + salt;
    const result = await userM.add(newUser);
    // console.log(result);
    res.redirect('./signin');
});

router.post('/signin', async (req, res) => {
    const userAccount = {
        username: req.body.username,
        password: req.body.password,
    }
    const user = await userM.get(userAccount.username);
    if (!user) {
        res.render('account/signin', {
            cssP: () => 'css',
            scriptP: () => 'empty',
            navP: () => 'nav',
            footerP: () => 'footer',
            msg: 'username does not exist!',
            color: 'danger',
        });
        return;
    }
    const salt = user.f_Password.substring(SHA_LENGTH);
    userAccount.password = shajs('sha256').update(userAccount.password + salt).digest('hex') + salt;
    if (userAccount.password === user.f_Password) {
        req.session.user = user;
        if (req.body.remember) {
            res.cookie('username', user.f_Username, { maxAge: 6000, httpOnly: true });
            res.redirect('/');
            return;
        }
        res.render('account/signin', {
            cssP: () => 'css',
            scriptP: () => 'empty',
            navP: () => 'nav',
            footerP: () => 'footer',
            msg: 'loged in!',
            color: 'success',
        });
        return;
    }
    res.render('account/signin', {
        cssP: () => 'css',
        scriptP: () => 'empty',
        navP: () => 'nav',
        footerP: () => 'footer',
        msg: 'pass does not exist!',
        color: 'danger',
    });
});

module.exports = router;