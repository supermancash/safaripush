import express from 'express';

const router = express.Router();

let devices = [];
let requestBodies = [];

router.post('/:newDevice/registrations/web.com.safaripushapi', (req, res) => {
    devices.push(req.params.newDevice);
    requestBodies.push(req.body);
    res.sendStatus(200);
});

router.get('/showdevices', (req, res) => {
    res.send(devices);
});

router.get('/showrequests', (req, res) => {
    res.send(requestBodies);
});

export default router;
