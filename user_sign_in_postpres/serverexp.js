const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const session = require('express-session');
app.use(session({
    secret: 'ajdvnioskemr',
    resave: false,
    saveUninitialized: true,
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/account', require('./controllers/account.C'));

app.get('/', (req, res) => {
    res.render('home', {
        cssP: () => 'css',
        scriptP: () => 'empty',
        navP: () => 'nav',
        footerP: () => 'footer',
    });
});


app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})