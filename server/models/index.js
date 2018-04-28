const Mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const errorSchema = require('./error')
const mdb = {}
mdb.origin = Mongoose

Mongoose.connect('mongodb://120.78.222.240:27017/jsError', err => {
  if (err) {
    console.log('mongodb connect error')
  } else {
    console.log('mongodb success')
    projectInit()
  }
})

mdb._create = function(name, schema) {
  // 取消mongoose复数集合
  mdb[name] = Mongoose.model(name, schema, name)
}

fs.readdirSync(path.resolve(__dirname)).forEach(file => {
  // 判断是否js文件, erorr为动态model，不做添加
  if (file === 'index.js' || file === 'error.js' || !/\.js$/.test(file)) return
  const { name, schema, methods } = require(path.join(__dirname, file))
  mdb[name] = Mongoose.model(name, schema)
  const model = mdb[name]
  _.forEach(methods, function(fn, name) {
    model[name] = function() {
      return fn.apply(model, arguments)
    }
  })
})

async function projectInit() {
  const projects = await mdb.project.find({})
  projects.forEach(col => {
    mdb._create(col.code, errorSchema)
  })
}

module.exports = mdb
