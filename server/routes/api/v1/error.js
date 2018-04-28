const ctrl = require('../../../controllers/error')

module.exports = router => {
  router.post('/', ctrl.receive)
  router.get('/search', ctrl.search)
}
