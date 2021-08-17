const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// try to put a breakpoint inside the functions below to see when it happens

//Serialization is converting an instance to a primitive form which can be stored outside the runtime(like a string/json/number)
passport.serializeUser((user, done) => done(null, user.id));

//Deserialization is taking the primitve form and constructing it to the instance it was before
passport.deserializeUser((id, done) => User.findById(id, (err, user) => {
    done(err, user);
}));

const tryLoadUser = (email, password, done) => User.findOne({ email })
    .then(user => {
        if (!user) {
            // if user not found, create a new user
            return done(null, false, { message: "We do not have a user with the given email. Perhaps register?" });
        }

        // user found, check password
        if (user.password !== password) {
            return done(null, false, { message: "Wrong password" });
        }

        return done(null, user);
    })
    .catch(err => done(null, false, { message: err }))

passport.use(new LocalStrategy({ usernameField: "email" }, tryLoadUser));

// Local Strategy -- 'real life' example with password hashing
/*
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        // Match User
        User.findOne({ email: email })
            .then(user => {
                // Create new User
                if (!user) {
                    const newUser = new User({ email, password });
                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                    // Return other user
                } else {
                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);
*/

module.exports = passport;