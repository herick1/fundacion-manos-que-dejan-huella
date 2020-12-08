
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

const sslRedirect = require('heroku-ssl-redirect').default
// enable ssl redirect
app.use(sslRedirect());
//const instagramPosts = require('instagram-posts');
const  webpush  = require('web-push')
const  vapidKeys  = {
  publicKey: 'BGpXrs5JMCp12-ZnyswX3fQyHttIdhwpy-BJGg8Uc-muLZORf82aPO1UBeRemcK_7thNFxIcDkjS3melYigx2wE',
  privateKey: 'nHSouI8mWyDjOQ8YpEBEq2RiXUmAuKurcIzj52s7en0'
}

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
  );

var conexion = require('./back-common/conexion');
const nodemailer = require('nodemailer');
let createTransport = nodemailer.createTransport(conexion.jConfig);

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
    exposedHeaders: "x-access-token",
    "Content-Type":"application/json" 
  })
  );


app.use(express.static('www'));

const fileUpload = require('express-fileupload')
app.use(fileUpload())

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(bodyParser.json());


//descargar APK
app.get('/download', function(req, res){
  var file = __dirname + '/dejatushuellas.apk';
  res.download(file); // Set disposition and send it.
});


//*********************************** INICIO DE MANEJO DE EVENTOS ********************************//
//GET
app.get("/evento", urlencodedParser, (req, res) => {
  var client = new Client({
    connectionString:   process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();
  client.query('SELECT * FROM eventos_all();'
    , (err, response) => {
      if (err) throw err;
      res.json(response.rows)
      client.end();
    });

});

app.get("/evento/imagenes", urlencodedParser, (req, res) => {
  var client = new Client({
    connectionString:   process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();
  client.query('SELECT * FROM top3_eventos_imagenes();'
    , (err, response) => {
      if (err) throw err;
      res.json(response.rows)
      client.end();
    });

});

app.post("/evento/crear", (req, res) => {
  let body = _.pick(req.body, ["nombre","fechaini","fechafin","descripcion","direccion","nombre_imagen","url"]);
  var client = new Client({
    connectionString:    process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();
  let query
  if(body.nombre_imagen=='null'|| body.url=='null'){
    query= `CALL Eve_crear('${body.nombre}','${body.fechaini}','${body.fechafin}','${body.descripcion}',
    '${body.direccion}', null, null)`;
  }
  else
    query= `CALL Eve_crear('${body.nombre}','${body.fechaini}','${body.fechafin}','${body.descripcion}',
  '${body.direccion}','${body.nombre_imagen}','${body.url}')`;
  client.query(query
    , (err, response) => {
      if (err) throw err;
      res.json(response)
      client.end();
    });
});



//ACTUALIZAR
app.put("/evento/actualizar/:id", urlencodedParser, (req, res) => {
  const id=req.params.id
  let body = _.pick(req.body, ["nombre","fechaini","fechafin","descripcion","direccion","nombre_imagen","url"]);
  var client = new Client({
    connectionString:   process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });

  client.connect();
  let query

  if(body.nombre_imagen==null|| body.url==null){
    query= `CALL Eve_actualizar(${id},'${body.nombre}', '${body.fechaini}', '${body.fechafin}', '${body.descripcion}', 
    '${body.direccion}', null, null)`
  }
  else{
    query= `CALL Eve_actualizar(${id},'${body.nombre}', '${body.fechaini}', '${body.fechafin}', '${body.descripcion}', 
    '${body.direccion}', '${body.nombre_imagen}', '${body.url}' );`
  }

  client.query(query
    , (err, response) => {
      if (err) throw err;
      res.json(response)
      client.end();
    });

});

//ELIMINAR
app.delete("/evento/eliminar/:id", urlencodedParser, (req, res) => {
  let id = req.params.id;
  console.log(id)
  var client = new Client({
    connectionString:  process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });

  client.connect();
  let query= `CALL Eve_eliminar(${id})`
  client.query(query
    , (err, response) => {
      if (err) throw err;
      res.json(response)
      client.end();
    });

});


/****************************** FIN DE MANEJO DE EVENTOS *******************************************/
// MANEJO DE estadisticas
app.post("/tranzabilidad/:dispositivo", urlencodedParser, (req, res) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true', 
    ssl: true,
  });
  const dispositivo=req.params.dispositivo;
  const modulo=req.body.modulo;
  client.connect();
  let query= `CALL Uso_App_Insertar('${dispositivo}','${modulo}');`
  client.query(query
    , (err, response) => {
      if (err) throw err;
      res.status(200).send({ "response": "Exitosa"})
      client.end();
    });
  console.log(process.env.DATABASE_URL)
  console.log("dispositivo: "+dispositivo+"  ---- "+modulo)

});


const instagram= require('./instagramPost')  
// MANEJO DE Publicaciones en instagram

app.get("/posts", urlencodedParser, async (req, res, next) => {
  try {

//const instagramPosts = require('instagram-posts');

//(async () => {
  //console.log();
  //res.status(200).send({ "response": "Exitosa", "Post": await instagramPosts('herick_1')}) 
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
 
})();
*/


var valor= await instagram('herick_1');
console.log(valor)
res.setHeader("Content-Type", "application/json; charset=utf-8");
res.status(200).send({ "response": "Exitosa", "Post": valor}) 
    /*.then(posts => {
          // do something
          res.status(200).send({ "response": "Exitosa", "Post": posts}) 
      })
     .catch(err => {
          res.status(200).send({ "response": err}) 
      });     
      */
    }
    catch (err) {
      next(err);
    }   
  });

/*
app.get("/posts", async (req, res, next) => {
  try {
    const instagramPosts = require('instagram-posts');
  //listing messages in users mailbox 
    let posts = await instagramPosts('herick_1');
    console.log(posts)
    res.status(200).send({ "response": "Exitosa", "Post": posts}) 
  } catch (err) {
    next(err);
  }
})
//*/

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
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `SELECT * FROM Usu_buscar_por_email('${email}');`
  client.connect();
  client.query(query
    , (err, response) => {
      cb(err,response.rows)
      console.log("ERRROR> "+err)
      console.log("BIEN> "+response)
      client.end()
    });
}

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
        const  accessToken  =  jwt.sign({ id:  user.usu_id }, SECRET_KEY, {
          expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
      }

    });
});

app.post('/recuperarClave', (req, res) => {

  const  email  =  req.body.email;
  findUserByEmail(email, (err, user)=>{
    if (err) return  res.status(500).send('Error del servidor!');
    if (!user[0]) return  res.status(404).send('Ups ocurrio un error!');
    else{
      let contragenerada = Math.random().toString(36).substring(7);
      console.log("random", contragenerada);
      let emailCorreo ={ 
        from:{ 
          name: 'Soporte dejatushuellas',
          address: 'soporte.dejatushuellas@gmail.com'
    },  //remitente
    to:  email,  //destinatario
    subject:`Recuperación de contraseña`,  //asunto del correo
    html:` 
    <div> 
    <p>Buenas, se ha creado la siguiente contraseña temporal: <strong>${contragenerada}</strong> para poder ingresar nuevamente al sistema, por favor realizar el cambio de la misma después de acceder. </p> 
    <br> 
    <p> <strong> NOTA: Favor no responder este mensaje que ha sido emitido automáticamente por el sistema </strong>  </p>                               
    </div> 
    ` 
  };

  const  password  =   bcrypt.hashSync(contragenerada,10);
  createTransport.sendMail(emailCorreo, function (error, info) { 
    if(error){ 
      console.log("Error al enviar email"); 
    } else{ 
      console.log("Correo enviado correctamente"); 
    } 
    createTransport.close(); 
  });

  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true', 
    ssl: true,
  });
  client.connect();
  let query= `CALL usu_recuperarContraseña('${email}', '${password}');`
  client.query(query
    , (err, response) => {
      res.status(200).send({ "response": "Exitosa"})
      client.end();
    });
}


});

})

/******* PILA ACAAAAAAAAAAAAAAAAAAAAA NO SE PORQUE ESTA 2 VECES CHEQUEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
app.post('/recuperarContraseña', (req, res) => {

  const  email  =  req.body.email;
  const  password  =   bcrypt.hashSync(req.body.password,10);
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= "call stored"
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });

});
*////////////////////////////////////////////////////
//CRUD DE USUARIOS -------------------------------------------------------------

app.get('/usuario', urlencodedParser, (req, res) => {
  var client = new Client({
    connectionString:  process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `SELECT * FROM Usu_ALL() `
  client.connect();
  client.query(query
    , (err, response) => {
      console.log("ERROR"+err)
      res.status(200).send(response.rows);
      client.end();
    });




})

const  createUser  = (user, cb) => {
  var client = new Client({
    connectionString:  process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `CALL Usu_crear('${user[0]}','${user[1]}','${user[2]}','${user[3]}','${user[4]}');`
  client.connect();
  client.query(query
    , (err, response) => {
      cb(err)
      client.end()
    });
}

app.post('/register', (req, res) => {
  //let body = _.pick(req.body, ["name","email"]);
  const  name  =  req.body.name;
  const  email  =  req.body.email;
  const apellido= req.body.apellido;
  const username= req.body.username;
  const  password  =  bcrypt.hashSync(req.body.password,10);


  createUser([name, apellido,email, password, username], (err)=>{
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


app.put('/usuario/:id', (req, res) => {
  const  email  =  req.body.email;
  const  nombre  =  req.body.nombre;
  const apellido = req.body.apellido
  const username= req.body.username;
  var client = new Client({
    connectionString:  process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();
  let query= `CALL Usu_actualizar(${req.params.id}, '${nombre}', '${apellido}', '${email}', '${username}');`
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
    connectionString:  process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();
  let query= `CALL Usu_eliminar(${req.params.id});`

  client.query(query
    , (err, response) => {
      if(err)
        res.status(500).send(err);
      else 
        res.status(200).send(response);
      client.end();
    });


});

//***********************************    notificaciones -------*****************************************************
app.post('/notificacion/suscribir', (req, res) => {
  const sub = req.body;
  console.log('Received Subscription on the server: ', sub);

  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();

  var query = `CALL Not_suscribir ('${sub.endpoint}', ${sub.expirationTime} , '${sub.keys.p256dh}' , '${sub.keys.auth}')`;
  
  client.query(query
    , (err, response) => {
      if(err){
        console.log(err)
        res.status(500).send(err);
      }
      else{
        res.status(200).send(response); 
      } 

      client.end();
    });

});



const notificationNuevoEvento = {
  "notification": {
    "title": "Nuevo evento disponible",
    "body": "Se ha creado un nuevo evento.",
    "icon": "assets/icon/icono72x72.png",
    "vibrate": [100, 50, 100],
    "data": {
      "dateOfArrival": Date.now(),
      "primaryKey": 1
    },
    "actions": [{
      "action": "explore",
      "title": "Go to the site",
    }]
  }
};

app.post('/notificacion/enviarNotificacionPersonalizada', (req, res) => {
  let titulo=req.body.titulo;
  let mensaje=req.body.mensaje;
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();

  const notificationPersonalizada = {
    "notification": {
      "title": titulo,
      "body": mensaje,
      "icon": "assets/icon/icono72x72.png",
      "vibrate": [100, 50, 100],
      "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
      },
      "actions": [{
        "action": "explore",
        "title": "Go to the site",
      }]
    }
  };

  var query = `SELECT * FROM Not_ALL()`;
  client.query(query
    , (err, response) => {
      if(err){
        console.log("err"+err)
        res.status(500).send(err);
      }
      else{
        allSubscriptions=response.rows;
        for(i=0; i<allSubscriptions.length; i++){
          allSubscriptions[i].keys={
            auth:allSubscriptions[i].auth, 
            p256dh:allSubscriptions[i].p256dh
          }
          delete allSubscriptions[i].auth;
          delete allSubscriptions[i].p256dh;
        }

        var cantidadSubsrcipciones=allSubscriptions.length;
        Promise.all(allSubscriptions.map(sub => webpush.sendNotification(sub, 
          JSON.stringify(notificationPersonalizada) )))
        .then(() => res.status(200).json({message: `Newsletter sent successfully. ${cantidadSubsrcipciones}`}))
        .catch(err => {
          if(cantidadSubsrcipciones>1 && err.body=='push subscription has unsubscribed or expired.\n'){


            var query = `CALL Not_delete_especifico('${err.endpoint}')`;

            client.query(query, (err, response) => {
              if(err){
                console.log("err"+err)
                res.status(500).send(err);
              }
              else{
                res.status(200).json({message: 'Newsletter sent successfully.'})
              }
            })

          }
          else{

            var query = `CALL Not_delete_especifico('${err.endpoint}')`;

            client.query(query, (err, response) => {
              if(err){
                console.log("err"+err)
                res.status(500).send("error:  "+err);
              }
              else{
                res.status(200).json({message: 'Las subscripciones expiraron.'})
              }
            })

          }

        });
      };
      client.end();
    })
})

app.get('/notificacion/get/cantidad/dispositivo', (req, res) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();

  var query = `SELECT * FROM notificaciones_cantidad_dispositivos()`;
  
  client.query(query
    , (err, response) => {
      if(err){
        res.status(500).send(err);
      }
      else{
        res.status(200).send(response.rows);
      }
    })
})

app.get('/notificacion/enviar/evento', (req, res) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  client.connect();

  var query = `SELECT * FROM Not_ALL()`;
  client.query(query
    , (err, response) => {
      if(err){
        console.log("err"+err)
        res.status(500).send(err);
      }
      else{
        allSubscriptions=response.rows;
        for(i=0; i<allSubscriptions.length; i++){
          allSubscriptions[i].keys={
            auth:allSubscriptions[i].auth, 
            p256dh:allSubscriptions[i].p256dh
          }
          delete allSubscriptions[i].auth;
          delete allSubscriptions[i].p256dh;
        }

        var cantidadSubsrcipciones=allSubscriptions.length;
        Promise.all(allSubscriptions.map(sub => webpush.sendNotification(sub, 
          JSON.stringify(notificationNuevoEvento) )))
        .then(() => res.status(200).json({message: `Newsletter sent successfully. ${cantidadSubsrcipciones}`}))
        .catch(err => {
          if(cantidadSubsrcipciones>1 && err.body=='push subscription has unsubscribed or expired.\n'){


            var query = `CALL Not_delete_especifico('${err.endpoint}')`; /////////////////////////CAMBIAR ESTE QUERY

            client.query(query, (err, response) => {
              if(err){
                console.log("err"+err)
                res.status(500).send(err);
              }
              else{
                res.status(200).json({message: 'Newsletter sent successfully.'})
              }
            })

          }
          else{

             var query = `CALL Not_delete_especifico('${err.endpoint}')`; /////////////////////////CAMBIAR ESTE QUERY

             client.query(query, (err, response) => {
               if(err){
                 console.log("err"+err)
                 res.status(500).send("error:  "+err);
               }
               else{
                 res.status(200).json({message: 'Las subscripciones expiraron.'})
               }
             })

           }

         });
      };
      client.end();
    })
})


//envio de correos
app.post('/contactanos/enviar', (req, res) => {
  const  name  =  req.body.name;
  const  email  =  req.body.email;
  const body= req.body.body;
  const ip= req.body.ip;
  const tiempo_actual= new Date()

  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `SELECT click_time FROM CONTACTANOS WHERE IP = '${ip}' Order by DESC LIMIT 1;`
  client.connect();
  client.query(query
    , (err, response) => {
      var f1
      if(response!=undefined)
        f1= response.rows[0].click_time
      else 
        f1=null
      console.log(f1)
      f2=new Date(f1)
      console.log(f2)
      f2.setMinutes(f2.getMinutes() + 5);
      if(tiempo_actual.getTime() >= f2.getTime() || f1==null){

        let emailCorreo ={ 
          from:{ 
            name: 'Soporte dejatushuellas',
            address: 'soporte.dejatushuellas@gmail.com'
          },  //remitente
          to:  `javiloria100@gmail.com, herick200@gmail.com`,  //destinatario
          subject:`Contactanos`,  //asunto del correo
          html:`
          <div>
          Buen día. Este es un mensaje enviado por el formulario de contactanos.
          </div>
          <br> 

          <div>
          <label> <strong> Nombre: </strong> </label>
          <p>
          ${name}
          </p>
          
          <label> <strong> Correo: </strong> </label>
          <p>
          ${email}
          </p>
          
          <label> <strong> Mensaje: </strong> </label>
          <p>
          ${body}
          </p>
          </div>`
        }

        createTransport.sendMail(emailCorreo, function (error, info) { 
          if(error){ 
            console.log("Error al enviar email: "+error); 
            res.status(500).send(error);
          } else{ 
            console.log("Correo enviado correctamente"); 
            var clientsito = new Client({
            connectionString: process.env.DATABASE_URL+'?ssl=true',
            ssl: true,
          });
          clientsito.connect();
            clientsito.query(`INSERT INTO CONTACTANOS (mensaje, nombre, email, ip, click_time) 
              VALUES ('${body}','${name}','${email}', '${ip}', '${tiempo_actual}');`
            , (errCorreo, responseCorreo) => {
              console.log(errCorreo)
              console.log(responseCorreo)
               res.status(200).json({message: 'Correo enviado exitosamente.'})
            })
           
          } 
          clientsito.end();
          createTransport.close(); 
        }); 
      }
      else{
        res.status(403).json({message: 'Correo no enviado... Debe esperar 5 minutos desde el ultimo correo.'})
      }

      //res.status(200).send(response.rows);

      client.end();
    });


  
})


/**************************** fin de notificaciones ***********************************************************/

/******************************* estadisticas de uso ************************************************************/

app.get('/dashboardEstadisticas/graficaMes/:year', urlencodedParser, (req, res) => {
  let year = req.params.year;
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `Select * from estadisticas_grafica_mes(${year}); `
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });
})

app.get('/dashboardEstadisticas/graficaMesDispositivo/:year', urlencodedParser, (req, res) => {
  let year = req.params.year;
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `Select * from estadisticas_grafica_mes_dispositivo(${year}); `
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });
})

app.get('/dashboardEstadisticas/graficaMesModulo/:year', urlencodedParser, (req, res) => {
  let year = req.params.year;
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `Select * from estadisticas_grafica_mes_modulo(${year});`
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });
})

app.get('/dashboardEstadisticas/graficaModulo/:year', urlencodedParser, (req, res) => {
  let year = req.params.year;
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `Select * from estadisticas_grafica_modulo(${year}); `
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });
})

app.get('/dashboardEstadisticas/graficaDispositivo/:year', urlencodedParser, (req, res) => {
  let year = req.params.year;
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `Select * from estadisticas_grafica_dispositivo(${year}); `
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });
})

app.get('/dashboardEstadisticas/graficaYear/:year', urlencodedParser, (req, res) => {
  let year = req.params.year;
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `Select * from estadisticas_grafica_año(${year}); `
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });
})


app.get('/dashboardEstadisticas/year', urlencodedParser, (req, res) => {
  var client = new Client({
    connectionString: process.env.DATABASE_URL+'?ssl=true',
    ssl: true,
  });
  let query= `Select * from estadisticas_get_año(); `
  client.connect();
  client.query(query
    , (err, response) => {
      res.status(200).send(response.rows);
      client.end();
    });
})

/******************************* FIN DE ESTADISTICAS DE USO ****************************************************/


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