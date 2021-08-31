const express = require("express");
const router = express.Router();
const passport = require("passport");
const {resolvePublicPath} = require("../path-utils")
const User = require("../models/user");

// router.get('/register', (req, res, next) => {
//     if (req.user){
//         // if user already loggedin, redirect to homepage (this is for Baruch :D )
//         return res.status(304).redirect("/")
//     }
//     res.sendFile(resolvePublicPath("register.html"))
// })

router.post("/register", (req, res, next) => {
    const { email, password, foo } = req.body;
    new User({ email, password })
        .save()
        .then(user => res.json(user))
        .catch(err => res.status(409).json(err));
});

router.get("/login", (req, res, next) => {
    req.session.accessCounter = (req.session.accessCounter || 0) + 1

    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }

        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next);
});

//todo: logout should be added here

module.exports = router;