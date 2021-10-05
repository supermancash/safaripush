const express = require('express');
const router = express.Router();

router.get('/', function(req) {
  document.getElementById("requestLog").innerHTML = req.body.toLocaleString();
});

module.exports = router;
