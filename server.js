
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
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");
// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  // ...
};

// Initialize Firebase
firebase.initializeApp({
  serviceAccount:"manosquedejanhuellas-1df96-8a1897eaf672.json",
  databaseURL:"https://manosquedejanhuellas-1df96.firebaseio.com/"
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
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
    app.use(express.static('www'));
  })
}
//app.use(express.static('www'));

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

//descargar
app.get('/download', function(req, res){
  var file = __dirname + '/dejatushuellas.apk';
  res.download(file); // Set disposition and send it.
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
  let body = _.pick(req.body, ["nombre","fechaini","fechafin","descripcion","direccion"]);
  client.connect();
  let query= "INSERT INTO EVENTO (EVE_NOMBRE,EVE_FECHA_INI,EVE_FECHA_FIN,EVE_DESCRIPCION,EVE_DIRECCION) values('"+body.nombre+"','"+body.fechaini+"','"+body.fechafin+"','"+body.descripcion+"','"+body.direccion+"');"
  client.query(query
    , (err, response) => {
    res.json(response)
  });
   // client.end();
});

app.post("/notificacion", urlencodedParser, (req, res) => {
  let body = _.pick(req.body, ["token"]);

 var db= firebase.database();
  var pathtok=db.ref("token-device").push();
  pathtok.set({
    token:body.token
  })

  res.json({ status: "success", message: body.token });
  
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
       if (err){  //este es el caso de que no exista el html 
          if(splitt[2].split('#')[0]=='quienes-somos'){ //puede darse el caso que en quienessomos por tener un fragmentp
            res.status(200).sendFile(`/`, {root: 'www'}) //entre en esta condicion             
          }else res.redirect('/es/no-found');
        }else  // este es el caso de que si exista un html asi y por eso lo imprime
         res.status(200).sendFile(`/`, {root: 'www'})
    });
  }else{
    if (req.path == '/cordova.js')
       res.status(200).sendFile(`/`, {root: 'www'})
    else res.redirect('/es/no-found');
  }
});

app.get("/es/no-found", (req, res) => {
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
