var express = require('express');
var router = express.Router();

var user = require('../back-controllers/UsuarioControllers.js');
/* GET users listing. */
router.get('/', user.todo);
router.post('/login', user.login);
router.post('/register', user.crear);
router.put('/actualizar/:id', user.actualizar);
router.delete('/eliminar/:id', user.eliminar);
module.exports = router;