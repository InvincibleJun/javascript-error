const ctrl = require('../../../controllers/user')

module.exports = router => {
  router.get('/login', ctrl.login)
  router.get('/user/search', ctrl.search)
}
