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
      type: Object
    },
    users: {
      type: Array,
      default: []
    },
    createTime: {
      type: Date,
      default: Date.now()
    }
  }
}
