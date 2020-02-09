var express = require('express');
var router = express.Router();

var evento= require('../back-controllers/EventoControllers.js');
/* GET eventos listing. */
router.get('/', evento.todo);
router.post('/agregar', evento.agregar);
module.exports = router;