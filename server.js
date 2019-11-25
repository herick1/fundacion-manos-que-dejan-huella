
const rp = require("request-promise");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ip = require("ip");
var app = express();
const fs = require('fs');

const path = require('path');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


/*
app.use(express.static(__dirname+'/dist/photo-rc1'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/photo-rc1/index.html'));
});

app.use(
  cors({
    origin: true,
    exposedHeaders: "x-access-token"
  })
);*/

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});




app.use(bodyParser.json());




app.get("/jugador", urlencodedParser, (req, res) => {
  console.log(" GET /prueba:");
  client.connect();

client.query('SELECT * FROM PRUEBA;'
  , (err, response) => {
  if (err) throw err;
  res.json(response.rows)
 // client.end();
});

});

// MANEJO DE EVENTOS
app.get("/evento", urlencodedParser, (req, res) => {
  client.connect();
client.query('SELECT * FROM EVENTO;'
  , (err, response) => {
  if (err) throw err;
  res.json(response.rows)
 // client.end();
});

});

app.post("/evento", urlencodedParser, (req, res) => {
  //let body = _.pick(req.body, ["nombre","fechaini","fechafin","descripcion","direccion"]);
 // YO.name = body.name;
  //YO.url = body.url;
  client.connect();
  client.query("INSERT INTO EVENTO (EVE_NOMBRE,EVE_FECHA_INI,EVE_FECHA_FIN,EVE_DESCRIPCION,EVE_DIRECCION) values('PRUEBA','12-12-2019','12-12-2019','ESTA ES MI DESCRIPCION','LA QUINTA');"
    , (err, response) => {
    if (err) throw err;
    res.json(response.rows)
  });
   // client.end();
});


// ---- SERVE APLICATION PATHS ---- //
app.get('*', function (req, res) {
  var splitt = req.path.split("/");
  console.log(req.path)
  if(splitt.length == 3){ //esto porque siempre tenemos /tabs/lacarpetadela html
    console.log(req.path)
    var fullname = path.join(__dirname,'src','app',splitt[2], splitt[2]+'.page.html'); 
    console.log(fullname)  
    fs.access(fullname, fs.constants.R_OK, (err) => {
       if (err)  //este es el caso de que no exista el html 
          res.redirect('/tabs/no-found');
        else  // este es el caso de que si exista un html asi y por eso lo imprime
         res.status(200).sendFile(`/`, {root: 'www'})
    });
  }else{
    if (req.path == '/cordova.js')
       res.status(200).sendFile(`/`, {root: 'www'})
    else res.redirect('/tabs/no-found');
  }
});

app.get("/tabs/no-found", (req, res) => {
    res.status(404).sendFile(`/`, {root: 'www'})
});



app.put("/*", (req, res) => {
  res.status(404).send();
});

app.delete("/*", (req, res) => {
  res.status(404).send();
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);
