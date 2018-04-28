/**********************************
 * desc: 登陆相关控制器
 *********************************/
const request = require('request')

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
              let data = JSON.parse(body)
              let result = await mdb.user.findOne({ id: data.id })
              if (!result) {
                await mdb.user.create(
                  ({
                    login,
                    id,
                    name,
                    bio,
                    company,
                    avatar_url,
                    email,
                    html_url
                  } = data)
                )
              }
              req.session.user = { id, name }
              res.redirect(req.session.backUrl)
            }
          }
        )
      }
    }
  )
}

module.exports = {
  login
}
