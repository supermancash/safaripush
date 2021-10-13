const express = require('express');
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
    res.sendStatus(200);
});

router.get('/showrequests', (req, res) => {
    res.send(requestBodies);
    res.sendStatus(200);
});

module.exports = router;
