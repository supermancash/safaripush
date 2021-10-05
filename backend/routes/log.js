const express = require('express');
const router = express.Router();

let recentLogs = [];

router.post('/', function(req) {
  recentLogs.push(req.body);
});

router.get('/showthem', (req, res) => {
  res.send(recentLogs);
})

module.exports = router;
