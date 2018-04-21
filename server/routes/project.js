var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/project')

router.post('/create', ctrl.create);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
  
module.exports = router;
