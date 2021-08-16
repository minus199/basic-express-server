const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.accessCounter = (req.session.accessCounter  || 0) + 1 
  res.json( { title: 'Express' });
});

module.exports = router;
