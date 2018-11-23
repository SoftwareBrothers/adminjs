/**
 * @fileOverview Mongoose configuration
 */

const mongoose = require('mongoose')

module.exports.connect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URL)
  return connection
}

module.exports.mongoose = mongoose
