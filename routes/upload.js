const express = require('express');

const fileUpload = require("express-fileupload");
const {resolvePublicPath,genRandomFilename} = require("../path-utils") 

const router = express.Router();

// a middleware only for this router(i.e. router-level middleware), notice how it gets 2 callbacks instead of one
//see: https://expressjs.com/en/guide/using-middleware.html
router.use(fileUpload())

router.get('/', (req, res, next) => {
    res.sendFile(resolvePublicPath('uploads.html'));
})

//todo: add the route /uploads/:fileId to download the file with the browser

router.post('/', function (req, res, next) {
    req.session.uploadCounter = (req.session.uploadCounter || 0) + 1;
    console.log(`User has uploaded ${req.session.uploadCounter} files`)

    for (const fileField in req.files) {
        const file = req.files[fileField]
        const [fileId, fileLocalPath] = genRandomFilename(file.name);

        file.mv(fileLocalPath, function (err) {
            if (err) {
                // internal server error
                return res.status(500).json(err);
            }

            res.json({ fileId, msg: 'file uploaded successfully' });
        });
    }
});

module.exports = router;
