const mongoose = require('../db/database')

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: new Date().toISOString() }
})

module.exports = mongoose.model('user', userSchema);