var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const _ = require("lodash");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var user = require('../back-controllers/UsuarioControllers.js');
/* GET users listing. */
router.get('/',urlencodedParser, user.todo);
router.post('/login', user.login);
router.post('/register',user.crear);
router.put('/actualizar/:id', user.actualizar);
router.delete('/eliminar/:id', user.eliminar);
module.exports = router;