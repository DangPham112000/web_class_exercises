const router = require('express').Router();
const userM = require('../models/user.M');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Router } = require('express');
const saltRounds = 10;

router.get('/signin', async (req, res) => {
    if (req.cookies.username) {
        res.redirect('/');
        return;
    }
    if (req.user) {
        res.redirect('/');
        return;
    }
    res.render('account/signin', {});
});

router.get('/signup', (req, res) => {
    if (req.user) {
        res.redirect('/');
        return;
    }
    res.render('account/signup', {});
});

router.get('/signout', (req, res) => {
    if (req.user) {
        req.logOut();
    }
    return res.redirect('/account/signin');
});

router.post('/signup', async (req, res, next) => {
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
    newUser.f_Password = await bcrypt.hash(newUser.f_Password, saltRounds);
    const result = await userM.add(newUser);
    res.redirect('./signin');
});

router.post('/signin', async (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.render('account/signin', {
                msg: 'err: ' + err,
                color: 'danger',
            });
        }
        if (!user) { 
            return res.render('account/signin', {
                msg: 'username does not exist!',
                color: 'danger',
            }); 
        }
        req.logIn(user, function (err) {
            if (err) { 
                return res.render('account/signin', {                    
                    msg: 'req.logIn: ' + err,
                    color: 'danger',
                }); 
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

module.exports = router;