const express = require('express');
const router = express.Router();

//mock data - should be loaded from db
const devices = [
    { id: 1, type: "laptop", isOnline: true, ip: 'xx.xx.xx.xx' },
    { id: 2, type: "laptop", isOnline: true, ip: 'xx.xx.xx.xx' },
    { id: 3, type: "tablet", isOnline: false, ip: 'yy.yy.yy.yy' },
    { id: 4, type: "mobile", isOnline: true, ip: 'zz.zz.zz.zz' },
    { id: 5, type: "laptop", isOnline: false, ip: 'xx.xx.xx.xx' },
]

// curl "localhost:3000/devices?filter=type&type=laptop"
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

module.exports = router;
