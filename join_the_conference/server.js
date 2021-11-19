const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = [];

const mFeedback = require('./m_feedback');

function addUser(userInfo) {
    db.push({ ...userInfo })
}

app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('/registered', (req, res) => {
    res.redirect('registered.html');
});

app.post('/saveinfor', (req, res) => {
    const userInfo = req.body;
    addUser(userInfo);
    res.send(userInfo);
});

app.get('/feedback', (req, res) => {
    const userInfo = req.query;
    const html = mFeedback.html(userInfo.fullname, userInfo.email, userInfo.phone);
    res.send(html);
});

app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
