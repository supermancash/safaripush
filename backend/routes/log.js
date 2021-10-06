const express = require('express');
const router = express.Router();

let recentLogs = [];

router.post('/', function (req, res) {
    if (req.body != null) {
        recentLogs.push(req.body);
        res.sendStatus(200);
    }
});

router.get('/showthem', (req, res) => {
    res.send(recentLogs);
})

module.exports = router;
