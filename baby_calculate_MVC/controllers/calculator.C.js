const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('calculator', {
        x: 7,
        y: 144,
        opt: '/',
        result: 'result'
    });
});

router.post('/', (req, res) => {
    const x = parseFloat(req.body.x);
    const y = parseFloat(req.body.y);
    const opt = req.body.opt;
    let result;
    switch (opt) {
        case '+':
            result = x + y;
            break;
        case '-':
            result = x - y;
            break;
        case '*':
            result = x * y;
            break;
        case '/':
            result = x / y;
            break;
    }
    res.render('calculator', {
        x,
        y,
        opt,
        result
    });
});

module.exports = router;

