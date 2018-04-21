module.exports = {
    name: "project",
    schema: {
      name: {
        type: String,
        unique: true
      },
      host: {
        type: Array,
        default: []
      },
      creator: {
        type: String,
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
  };
  