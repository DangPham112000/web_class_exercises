const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        ifEquals2(s1, s2, options) { 
            if (s1 === s2) {
                return options.fn(this);
            } 
            return options.inverse(this);
        }
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.render('home');
});

app.use('/calculator', require('./controllers/calculator.C'));

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})