const UA = require('ua-device')
const request = require('request')
const uuid = require('uuid/v1')
module.exports = {
  receive,
  search
}

async function search(req, res, next) {
  const { _id, page = 1, size = 18 } = req.query
  let skip = (page - 1) * size
  const { code } = await mdb.project.findById(_id)
  const total = await mdb[code].count()
  const list = await mdb[code]
    .find({})
    .sort({ _id: -1 })
    .limit(size)
    .skip(skip)
  res.send({
    code: 200,
    data: {
      list,
      page,
      size,
      total
    }
  })
}

/**
 * 错误接受函数
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function receive(req, res, next) {
  const token = req.body.token
  const userAgent = req.headers['user-agent']
  const { ip, body } = req
  const { token, location } = body

  // token 校验
  let project = await mdb.project.findById(token)
  if (!project) {
    res.send(403)
  } else {
    // host检验
    let { host } = project
    if (host.find(h => h.indexOf(location) === -1)) {
      res.send(403)
    }
  }

  // IP处理
  let position
  try {
    position = await resolveIp(ip)
  } catch (e) {
    position = { country: '未知', region: '未知', city: '未知' }
  }

  // 数据聚合
  const data = Object.assign(body, {
    uuid: uuid(),
    ip,
    position,
    userAgent,
    ...UA(userAgent)
  })

  // 插入
  await mdb[code].create(data)

  // 返回
  res.send(200)
}

function resolveIp(ip) {
  if (!ip) return {}
  return new Promise((resolve, reject) => {
    request(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`, function(
      err,
      res,
      body
    ) {
      err && reject(err)
      let result = JSON.parse(body)
      if (result.code === 0) {
        const { country, region, city } = result.data
        resolve({ country, region, city })
      } else {
        reject('获取ip错误')
      }
    })
  })
}
