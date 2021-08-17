const uuid = require("uuid").v4
const path = require("path")

const rootPath = __dirname;

const publicPath = path.join(rootPath, 'views')

const uploadPath = path.join(rootPath, 'uploads');

module.exports = {}

module.exports.resolvePublicPath = fileName => path.join(publicPath, fileName)

module.exports.genRandomFilename = originalFilename => {
    const fileId = uuid();
    return [fileId, path.join(uploadPath, fileId + path.extname(originalFilename))];
}
