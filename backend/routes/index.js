import express from 'express';

const router = express.Router();

import pushPackageRouter from './pushPackage.js';
import logsRouter from './log.js';
import devicesRouter from './device.js';
import notificationRouter from './notification.js';


router.use('/v1/pushPackages/web.com.safaripushapi', pushPackageRouter);
router.use('/v2/pushPackages/web.com.safaripushapi', pushPackageRouter);
router.use('/v1/log', logsRouter);
router.use('/v1/devices', devicesRouter);
router.use('/notifications', notificationRouter)

export default router;
