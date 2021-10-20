import express from 'express';
import path from 'path';

const router = express.Router();


router.post('/', (req, res) => {
  res.header({"Content-type":"application/zip"});
  res.sendFile(path.resolve('./backend/resources/pushPackage.zip'));
});

export default router;
