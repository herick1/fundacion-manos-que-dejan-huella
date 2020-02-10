var express = require('express');
var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var user = require('../back-controllers/UsuarioControllers.js');
/* GET users listing. */
router.get('/',urlencodedParser, user.todo);
router.post('/login', urlencodedParser,user.login);
router.post('/register', urlencodedParser,user.crear);
router.put('/actualizar/:id', urlencodedParser,user.actualizar);
router.delete('/eliminar/:id',urlencodedParser, user.eliminar);
module.exports = router;