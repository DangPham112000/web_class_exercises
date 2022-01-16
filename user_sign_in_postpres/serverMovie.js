const express = require('express');
const app = express();
const port = 3000;

require('./middlewares/handlebars')(app);
require('./middlewares/session')(app);


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());


require('./middlewares/passport')(app);

app.use('/account', require('./controllers/account2.C'));

app.get('/', (req, res) => {
    res.render('home', {
        cssP: () => 'css',
        scriptP: () => 'empty',
        navP: () => 'nav',
        footerP: () => 'footer',
    });
});

app.use(express.static(__dirname + '/public'));


module.exports = app;