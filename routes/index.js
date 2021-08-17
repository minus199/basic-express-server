const express = require('express');
const router = express.Router();
const { resolvePublicPath } = require("../path-utils")

/* GET home page. */
router.get('/', function (req, res, next) {
  req.session.accessCounter = (req.session.accessCounter || 0) + 1

  res.sendFile(resolvePublicPath('index.html'));
});

module.exports = router;
