
const session = require('express-session');

module.exports = app => {
    app.use(session({
        secret: 'ajdvnioskemr',
        resave: false,
        saveUninitialized: true,
    }));
};