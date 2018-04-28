const express = require('express')
const path = require('path')
const fs = require('fs')

function createRouter(versionDir) {
  let router = express.Router()
  fs.readdirSync(versionDir).forEach(function(file) {
    require(path.join(versionDir, file))(router)
  })
  return router
}

const router = express.Router()
const v1 = createRouter(path.join(__dirname, 'api/v1'))

router.use('/api/v1', v1)
module.exports = router
