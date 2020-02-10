var express = require('express');
var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var evento= require('../back-controllers/EventoControllers.js');
/* GET eventos listing. */
router.get('/',urlencodedParser, evento.todo);
router.post('/agregar', urlencodedParser,evento.agregar);
module.exports = router;