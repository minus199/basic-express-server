const express = require('express');

const fileUpload = require("express-fileupload");
const uuid = require("uuid").v4
const path = require("path")
 
const uploadPath = path.dirname(__dirname) + '/uploads/';

const genRandomFilename = originalFilename => uuid() + path.extname(originalFilename);

const router = express.Router();

// a middleware only for this router(i.e. router-level middleware), notice how it gets 2 callbacks instead of one
//see: https://expressjs.com/en/guide/using-middleware.html
router.use(fileUpload())

router.post('/', function (req, res, next) {
    req.session.uploadCounter = (req.session.uploadCounter || 0) + 1;
    console.log(`User has uploaded ${req.session.uploadCounter} files`)

    for (const fileField in req.files) {
        const file = req.files[fileField]
        const randomFileName = genRandomFilename(file.name);

        file.mv(uploadPath + randomFileName, function (err) {
            if (err) {
                // internal server error
                return res.status(500).json(err);
            }

            res.json({ fileId: randomFileName });
        });
    }
});

module.exports = router;
