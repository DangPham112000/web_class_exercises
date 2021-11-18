const express = require('express');
const app = express();
const port = 3000;

const mCal = require('./m_cal');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.redirect('index.html');
})

app.get('/cal', (req, res) => {
    console.log('GET cal', req.query); 
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);
    const opt = req.query.opt;
    let rs;
    switch (opt) {
        case '+':
            rs = x + y;
            break;
        case '-':
            rs = x - y;
            break;
        case '*':
            rs = x * y;
            break;
        case '/':
            rs = x / y;
            break;
    }
    // console.log(mCal);
    res.send(mCal.html(x, y, opt, rs));
})

app.post('/cal', (req, res) => {
    console.log('POST cal', req.body); 
    const x = parseInt(req.body.x);
    const y = parseInt(req.body.y);
    const opt = req.body.opt;
    let rs;
    switch (opt) {
        case '+':
            rs = x + y;
            break;
        case '-':
            rs = x - y;
            break;
        case '*':
            rs = x * y;
            break;
        case '/':
            rs = x / y;
            break;
    }
    // console.log(mCal);
    res.send(mCal.html(x, y, opt, rs));
})

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})