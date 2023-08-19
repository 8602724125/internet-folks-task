const mongoose = require('../db/database')
const User = require('./user.model')

const Schema = mongoose.Schema;
const communitySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: User 
  },
  created_at: { type: Date, default: new Date().toISOString() },
  updated_at: { type: Date, default: new Date().toISOString() }

})

module.exports = mongoose.model('community', communitySchema);