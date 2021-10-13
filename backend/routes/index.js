const express = require('express');
const router = express.Router();

const pushPackageRouter = require('./pushPackage');
const logsRouter = require('./log');
const devicesRouter = require('./device');
let notificationRouter = require('./notification');

router.use('/v1/pushPackages/web.com.safaripushapi', pushPackageRouter);
router.use('/v2/pushPackages/web.com.safaripushapi', pushPackageRouter);
router.use('/v1/log', logsRouter);
router.use('/v1/devices', devicesRouter);
router.use('/notifications', notificationRouter)

module.exports = router;
