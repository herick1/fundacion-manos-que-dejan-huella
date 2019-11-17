
const rp = require("request-promise");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ip = require("ip");
var app = express();

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
  console.log(" GET /jugador:");
  client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;'
  , (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
    res.json({ status: "success", message: JSON.stringify(row) });
  }
  client.end();
});
});

//metodo que pinta todo en el angular
app.get("/partidas", urlencodedParser, (req, res) => {
  res.json({ status: "success", message: process.env.DATABASE_URL });
});

app.get("/tablas", urlencodedParser, (req, res) => {
  console.log(" GET /jugador:");
  client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;'
  , (err, res) => {
  if (err) throw err;
    console.log(JSON.stringify(res));
    res.json({ status: "success", message: JSON.stringify(row) });
  client.end();
});
});




app.post("/*", (req, res) => {
  res.status(404).send();
});

app.put("/*", (req, res) => {
  res.status(404).send();
});

app.delete("/*", (req, res) => {
  res.status(404).send();
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);
