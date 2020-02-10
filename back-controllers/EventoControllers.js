var eventoController = {};
const { Client } = require('pg');
const _ = require("lodash");

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
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
    client.connect();
    let query= "INSERT INTO EVENTO (EVE_NOMBRE,EVE_FECHA_INI,EVE_FECHA_FIN,EVE_DESCRIPCION,EVE_DIRECCION) values('"+body.nombre+"','"+body.fechaini+"','"+body.fechafin+"','"+body.descripcion+"','"+body.direccion+"');"
    client.query(query
      , (err, response) => {
      if (err) throw err;
      res.json(response)
      client.end();
    });


}

eventoController.actualizar = function(req, res){
    let body = _.pick(req.body, ["nombre","fechaini","fechafin","descripcion","direccion"]);
    const id=req.params.id
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
    client.connect();
    let query= `UPDATE EVENTO SET EVE_NOMBRE= '${body.nombre}',EVE_FECHA_INI=  '${body.fechaini}',EVE_FECHA_FIN= 
     '${body.fechafin}' ,EVE_DESCRIPCION= '${body.descripcion}' ,EVE_DIRECCION=  '${body.direccion}'
      where EVE_id=${id}`
    client.query(query
      , (err, response) => {
      if (err) throw err;
      res.json(response)
      client.end();
    });


}

eventoController.eliminar = function(req, res){
    const id=req.params.id
    var client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
    client.connect();
    let query= `DELETE FROM EVENTO WHERE EVE_ID=${id} `
    client.query(query
      , (err, response) => {
      if (err) throw err;
      res.json(response)
      client.end();
    });


}
module.exports = eventoController;