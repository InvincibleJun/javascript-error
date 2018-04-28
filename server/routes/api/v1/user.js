const ctrl = require('../../../controllers/user')

module.exports = router => {
  router.get('/login', ctrl.login)
}
