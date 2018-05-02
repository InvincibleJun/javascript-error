const UA = require('ua-device')
const errorSchema = require('../models/error')

async function projects(req, res, next) {
  let data = await mdb.project.find({})
  res.send({ code: 200, data })
}

async function create(req, res, next) {
  const { name, host, users, code } = req.body
  const creator = req.session.user.id
  const { _id } = await mdb.project.create({ name, host, creator, users, code })
  mdb._create(code, errorSchema)
  res.send({ code: 200, data: { _id } })
}

// function createUuid() {
//   var s = [];
//   var hexDigits = "0123456789abcdef";
//   for (var i = 0; i < 36; i++) {
//     s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//   }
//   s[14] = "4";
//   s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
//   s[8] = s[13] = s[18] = s[23] = "-";
//   var uuid = s.join("");
//   return uuid;
// }

module.exports = {
  create,
  projects
}
