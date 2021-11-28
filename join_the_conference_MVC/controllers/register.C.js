const express = require('express');
const router = express.Router();
const participantModel = require('../models/participant.M');

const participant = participantModel.all();

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', (req, res) => {
    const newParticipant = req.body;
    participant.push(newParticipant);
    console.log(participant);
    res.render('notication', {
        newParticipant
    });
});

module.exports = router;