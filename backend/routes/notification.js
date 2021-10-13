const express = require('express');
const pushService = require('../services/push');
const router = express.Router();

router.get('/:link', (req, res) => {
    if(req.params.link==="test"){
        res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley");
    }
});

router.post('/send/:deviceToken', (req, res) => {
    pushService(req.params.deviceToken, req.body.notificationTitle, req.body.notificationBody);
    res.sendStatus(200);
})

module.exports = router;
