var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const _ = require("lodash");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var evento= require('../back-controllers/EventoControllers.js');
/* GET eventos listing. */
router.get('/',urlencodedParser, evento.todo);
router.post('/agregar', evento.agregar);
router.put('/actualizar/:id', evento.actualizar);
router.delete('/eliminar/:id', evento.eliminar);
module.exports = router;