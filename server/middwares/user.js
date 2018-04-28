module.exports = async function(req, res, next) {
  if (/^(\/api\/v1\/login)/.test(req.path) || req.session.user) {
    next()
  } else {
    req.session.backUrl = req.path
    res.redirect(
      'https://github.com/login/oauth/authorize?client_id=974b565d5382657a3daf'
    )
  }
}
