const mongoose = require('../db/database')
const Community = require('./community.model')
const Role = require('./role.model')
const User =  require('./user.model')

const Schema = mongoose.Schema;
const memberSchema = new Schema({
    community : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Community 
    },
    role : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Role 
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User 
    },
    created_at: { type: Date, default: new Date().toISOString() },
})

module.exports = mongoose.model('member', memberSchema);