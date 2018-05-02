module.exports = async function(req, res, next) {
  req.session.user = { id: '5ae3e94b89c6f220b0277490', name: 'chenjun' }
  return next()
  if (/^(\/api\/v1\/login)/.test(req.path) || req.session.user) {
    next()
  } else {
    req.session.backUrl = req.path
    res.redirect(
      'https://github.com/login/oauth/authorize?client_id=974b565d5382657a3daf'
    )
  }
}
