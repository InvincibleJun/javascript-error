var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/error')

/* GET users listing. */
router.post('/error', ctrl.receiveErorr);


module.exports = router;
