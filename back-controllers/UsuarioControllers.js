var userController = {};

const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const { Client } = require('pg');
const _ = require("lodash");

// funciones de autenticacion
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
  
  
userController.todo = function(req, res){
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
    
}

userController.login = function(req, res){
  let body = _.pick(req.body, ["email","password"]);
    console.log(body)
    const  email  =  body.email;
    const  password  =  body.password;
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
  
}

userController.crear = function(req, res){
 let body = _.pick(req.body, ["name","email","apellido","password"]);
 const  name  =  body.name;
 const  email  =  body.email;
 const apellido= body.apellido;
 console.log(body);
 const  password  =  bcrypt.hashSync(body.password,10);


 createUser([name, apellido,email, password], (err)=>{
     if(err) return  res.status(500).send("Server error!");
     findUserByEmail(email, (err, user)=>{
         if (err) return  res.status(500).send('Server error!');  
         const  expiresIn  =  24  *  60  *  60;
         const  accessToken  =  jwt.sign({ id:  user.usu_id }, SECRET_KEY, {
             expiresIn:  expiresIn
         });
         res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn });
     });
 });
}

userController.actualizar = function(req, res){
  console.log(req.body)
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
    
}

userController.eliminar = function(req, res){
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
    
}  

module.exports = userController;