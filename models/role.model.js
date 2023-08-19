const mongoose = require('../db/database')

const Schema = mongoose.Schema;
const roleSchema = new Schema({
  name: { type: String, unique: true },
  created_at: { type: String, default: new Date().toISOString() },
  updated_at: { type: String, default: new Date().toISOString() },
})

module.exports = mongoose.model('role', roleSchema);