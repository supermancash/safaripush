const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
  res.header({"Content-type":"application/zip"});
  res.sendFile(path.resolve('./backend/var/www/safari.push/pushPackage.zip'));
});

module.exports = router;
