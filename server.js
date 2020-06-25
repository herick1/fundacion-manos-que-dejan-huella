
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
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');
const SECRET_KEY = "secretkey23456";


const instagramPosts = require('instagram-posts');

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
*/
app.use(
  cors({
    origin: true,
    exposedHeaders: "x-access-token"
  })
);
/*
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https'){
      res.redirect(`https://${req.header('host')}${req.url}`)
    }
      
    else
    next()
  })
}
*/
app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});




app.use(bodyParser.json());


//descargar
app.get('/download', function(req, res){
  var file = __dirname + '/dejatushuellas.apk';
  res.download(file); // Set disposition and send it.
});


// MANEJO DE EVENTOS
app.get("/evento", urlencodedParser, (req, res) => {
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

});

// MANEJO DE Publicaciones en instagram
app.get("/posts", urlencodedParser, (req, res) => {

  (async () => {
      var posts = await instagramPosts('herick_1');
      res.status(200).send({ "response": "Exitosa", "Post": posts }) 
      /*
      [
          {
              id: 'BRWBBbXjT40',
              username: 'cats_of_instagram',
              time: 1488904930,
              type: 'image',
              likes: 809,
              comments: 10,
              text: 'This is my post',
              media: 'https://instagram.fbma1-1.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/1231231_123123_1231231.jpg',
              …
          },
          …
      ]
      */
  })();                   
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


//autenticacion
const  findUserByEmail  = (email, cb) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  let query= "SELECT * FROM usuario WHERE usu_email ='"+email+"'"
  client.connect();
  client.query(query
    , (err, response) => {
      cb(err,response.rows)
      console.log("ERRROR> "+err)
      console.log("BIEN> "+response)
      client.end()
  });
}

const  createUser  = (user, cb) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  console.log("USER> "+user)
  console.log("user pppp"+user[0])
  console.log("user pppp"+user[1])
  console.log("user pppp"+user[2])
  console.log("user pppp"+user[3])
  let query= "INSERT INTO usuario (usu_nombre,usu_apellido, usu_email, usu_password) values('"+user[0]+"','"+user[1]+"','"+user[2]+"','"+user[3]+"');"
  client.connect();
  client.query(query
    , (err, response) => {
      cb(err)
      console.log("ERRROR> "+err)
      console.log("BIEN> "+response)
      client.end()
  });
}

app.post('/register', (req, res) => {
  //let body = _.pick(req.body, ["name","email"]);
  const  name  =  req.body.name;
  const  email  =  req.body.email;
  const apellido= req.body.apellido;
  console.log(req.body);
  const  password  =  bcrypt.hashSync(req.body.password,10);


  createUser([name, apellido,email, password], (err)=>{
      if(err) return  res.status(500).send("Server error!");
      findUserByEmail(email, (err, user)=>{
          if (err) return  res.status(500).send('Server error!');  
          const  expiresIn  =  24  *  60  *  60;
          const  accessToken  =  jwt.sign({ id:  user.usu_id }, SECRET_KEY, {
              expiresIn:  expiresIn
          });
          res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn          
          });
      });
  });
});


app.post('/login', (req, res) => {
  
  const  email  =  req.body.email;
  const  password  =  req.body.password;
  findUserByEmail(email, (err, user)=>{
      if (err) return  res.status(500).send('Error del servidor!');
      if (!user[0]) return  res.status(404).send('Credenciales invalidas!');
      else{

        const  result  =  bcrypt.compareSync(password, user[0].usu_password);
        if(!result) return  res.status(401).send('Credenciales invalidas!');
        //if(password !=value.usu_password) return  res.status(401).send('Password not valid!');
        const  expiresIn  =  24  *  60  *  60;
        console.log("Ssssssss"+user)
        const  accessToken  =  jwt.sign({ id:  user.usu_id }, SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
      }
     
});
});

//CRUD DE USUARIOS -------------------------------------------------------------

app.get('/usuario', urlencodedParser, (req, res) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  let query= "Select usu_nombre as nombre, usu_apellido as apellido, usu_email as email, usu_id as id from usuario; "
  client.connect();
  client.query(query
    , (err, response) => {
      console.log("EEEEEEEEEERRORR"+err)
    res.status(200).send(response.rows);
    client.end();
  });

 
      
 
})

app.put('/usuario/:id', (req, res) => {
  const  email  =  req.body.email;
  const  nombre  =  req.body.nombre;
  const apellido = req.body.apellido
  var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  let query= "update usuario set usu_nombre='"+nombre+"' , usu_apellido= '"+apellido+"' , usu_email='"+email+"' where usu_id= "+req.params.id+ ";"
  client.query(query
    , (err, response) => {
      if(err)
      res.status(500).send(err);
      else 
      res.status(200).send(response);
    client.end();
  });
  
 
});

app.delete('/usuario/:id', (req, res) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  let query= "delete from usuario where usu_id= "+req.params.id+ ";"
  client.query(query
    , (err, response) => {
      if(err)
      res.status(500).send(err);
      else 
    res.status(200).send(response);
    client.end();
  });

 
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


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);
