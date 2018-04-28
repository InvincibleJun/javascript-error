module.exports = {
  name: 'user',
  schema: {
    id: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    bio: {
      type: String
    },
    login: {
      type: String
    },
    company: {
      type: String
    },
    avatar_url: {
      type: String
    },
    email: {
      type: String
    },
    html_url: {
      type: String
    }
  }
}
