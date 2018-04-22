var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/error')

/* GET users listing. */
router.post('/', ctrl.receive);

router.get('/search', ctrl.search);

module.exports = router;
