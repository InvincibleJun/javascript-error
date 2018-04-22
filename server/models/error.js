module.exports = {
  uuid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  createTime: {
    type: Date,  
    default: Date.now()
  },
  lineNo: {
    type: Number
  },
  colunmNo: {
    type: Number
  },
  ip: {
    type: String
  },
  origin: {
    type: String
  },
  location: {
    type: String
  },
  stack: {
    type: String
  },
  userAgent: {
    type: String
  },
  position: {
    type: Object
  },
  os: {
    type: Object
  },
  brower: {
    type: Object
  },
  device: {
    type: Object
  },
  engine: {
    type: Object
  },
  isWX: {
    default: false,
    type: Boolean
  },
  isConsole: {
    default: false,
    type: Boolean
  },
  consoleType: {
    type: Number,
    default: 0
  },
  isPhone: {
    default: false,
    type: String
  }
}
