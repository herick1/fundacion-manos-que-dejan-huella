var eventoController = {};
const { Client } = require('pg');


// MANEJO DE EVENTOS
eventoController.todo = function(req, res){
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
      client.connect();
    client.query('SELECT * FROM EVENTO;'
      , (err, response) => {
      if (err) throw err;
      res.json(response.rows)
      client.end();
    });

}
  
eventoController.agregar = function(req, res){
    let body = _.pick(req.body, ["nombre","fechaini","fechafin","descripcion","direccion"]);
    client.connect();
    let query= "INSERT INTO EVENTO (EVE_NOMBRE,EVE_FECHA_INI,EVE_FECHA_FIN,EVE_DESCRIPCION,EVE_DIRECCION) values('"+body.nombre+"','"+body.fechaini+"','"+body.fechafin+"','"+body.descripcion+"','"+body.direccion+"');"
    client.query(query
      , (err, response) => {
      if (err) throw err;
      res.json(response)
      client.end();
    });


}


module.exports = eventoController;