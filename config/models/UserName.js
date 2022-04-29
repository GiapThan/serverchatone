const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserName = new Schema({
    user: { type: String },
    pass: { type: String },
    monney: {type: Number},
  });
  
module.exports = mongoose.model('UserName', UserName)
