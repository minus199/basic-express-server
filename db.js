
// mongo db
const mongoose = require("mongoose");

const DB_NAME = 'express-js-lab'
const MONGO_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

module.exports = () => mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => {
      console.error("Shutting down due to fatal db error during connect!", err)
    });

    