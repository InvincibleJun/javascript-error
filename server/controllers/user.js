const request = require('request')

/**********************************
 * desc: 登陆相关控制器
 *********************************/

/**
 * githubd第三方登陆
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function login(req, res, next) {
  // 重新登陆删除session
  req.session.user = null
  // 回调用户token
  let code = req.query.code
  request(
    `https://github.com/login/oauth/access_token?code=${code}&client_id=974b565d5382657a3daf&client_secret=ac59b0e07817120f10b92c9bf3849419498a2765`,
    (err, response, body) => {
      let str = response.body
      let result = str.match(/access_token=(\w+)/i)
      if (result && result[1]) {
        request(
          {
            url: `https://api.github.com/user?access_token=${result[1]}`,
            headers: {
              'User-Agent': 'blog'
            }
          },
          async (err, response, body) => {
            if (!err) {
              const data = JSON.parse(body)
              const { id, name } = data
              let result = await mdb.user.findOne({ id: data.id })
              !result && (await mdb.user.create(data))
              req.session.user = { id, name }
              res.redirect(req.session.backUrl)
            }
          }
        )
      }
    }
  )
}

/**
 * 用户查询接口
 * @param {*} req
 * @param {string} req.query.key -查询key
 * @param {*} res
 * @param {*} next
 */
async function search(req, res, next) {
  const { key } = req.query
  if (!key) return res.send(200)
  const data = await mdb.user.find({
    $or: [
      {
        name: { $regex: `${key}`, $options: 'i' }
      },
      {
        email: { $regex: `${key}`, $options: 'i' }
      }
    ]
  })
  res.send({ code: 200, data })
}

module.exports = {
  login,
  search
}
