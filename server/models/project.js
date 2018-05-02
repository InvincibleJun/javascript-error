const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = {
  name: 'project',
  schema: {
    name: {
      type: String,
      unique: true
    },
    code: {
      type: String,
      unique: true
    },
    host: {
      type: Array,
      default: []
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    createTime: {
      type: Date,
      default: Date.now()
    }
  }
}
