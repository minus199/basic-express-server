module.exports = function (req, res, next) {
    if(!req.user){
        return res.status(403).json({message: "Not allowed"});
    }

    next()
}