var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/project')

router.post('/create', ctrl.create);

router.get('/get', ctrl.projects);
  
module.exports = router;
