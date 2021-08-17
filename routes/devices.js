const express = require('express');
const router = express.Router();

//mock data - should be loaded from db
//todo: move to mongo
const devices = [
    { id: 1, type: "laptop", isOnline: true, ip: 'xx.xx.xx.xx' },
    { id: 2, type: "laptop", isOnline: true, ip: 'xx.xx.xx.xx' },
    { id: 3, type: "tablet", isOnline: false, ip: 'yy.yy.yy.yy' },
    { id: 4, type: "mobile", isOnline: true, ip: 'zz.zz.zz.zz' },
    { id: 5, type: "laptop", isOnline: false, ip: 'xx.xx.xx.xx' },
]

// curl "localhost:3000/devices?filter=type&deviceType=laptop"
router.get('/', function (req, res, next) {
    req.session.accessCounter = (req.session.accessCounter || 0) + 1

    const { filter } = req.query
    switch (filter) {
        case 'isOnline':
            res.json(devices.filter(device => device.isOnline));
            break
        case 'isOffline':
            res.json(devices.filter(device => !device.isOnline));
            break
        case 'deviceType':
            res.json(devices.filter(device => device.type === req.query.deviceType));
            break
        default:
            res.json({ devices });
    }
});

router.get('/:id', (req,res,next) => {
    res.json(devices.find(device => device.id === parseInt(req.params.id)))
});

//todo: add an endpoint to POST a new device

//todo: add an endpoit to shutdown a device(set its isOnline to false, or do nothing if already false)
// PUT /devices/:deviceId/shutdown (no request body needed)
// todo: add an endpoint to toggle device isOnline(if online, toggle to offline. if online, toggle to offline)
// PUT /devices/:deviceId/toggle (no request body needed)

//todo: add devices page, with a list of devices and button on each device to shutdown and a button to toggle the device

module.exports = router;
