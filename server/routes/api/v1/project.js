const ctrl = require('../../../controllers/project')

module.exports = router => {
  router.post('/create', ctrl.create)

  router.get('/get', ctrl.projects)
}
