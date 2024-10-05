const mongoose = require('mongoose')


/**
 * Connects to the MongoDB database using the given url.
 * @param {string} url the url of the MongoDB database
 * @returns {Promise} a Promise that resolves when the connection is established
 */
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
