var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/v2/pushPackages/web.app.netlify.webpush', (req, res) => {
  res.header({"Content-type":"application/zip"});
  res.sendFile(path.resolve('./backend/var/www/safari.push/pushPackage.zip'));
});

module.exports = router;
