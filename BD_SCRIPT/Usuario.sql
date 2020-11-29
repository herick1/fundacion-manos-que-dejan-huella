CREATE TABLE USUARIO(
  USU_ID SERIAL,
  USU_NOMBRE VARCHAR(100) NOT NULL,
  USU_APELLIDO VARCHAR(100) NOT NULL,
  USU_EMAIL VARCHAR(200) NOT NULL UNIQUE,
  USU_PASSWORD VARCHAR(200) NOT NULL,
  USU_USERNAME VARCHAR(200) UNIQUE,
  CONSTRAINT PRIMARYKEY_USUARIO PRIMARY KEY (USU_ID)
);


-- Crear usuario
create or replace procedure Usu_crear(
  nombre VARCHAR,
  apellido VARCHAR,
  email VARCHAR,
  clave VARCHAR,
  username VARCHAR
)
LANGUAGE SQL   
as $$
	INSERT INTO usuario (usu_nombre,usu_apellido, usu_email, usu_password, usu_username) values(nombre, apellido,
	email, clave, username)

$$

-- actualizar usuario
create or replace procedure Usu_actualizar(
  idActualizar int,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  email VARCHAR(200),
  username VARCHAR(200)
)
LANGUAGE SQL   
as $$
 update usuario set usu_nombre=nombre, usu_apellido=apellido, usu_email=email, usu_username=username 
 where usu_id= idActualizar;

$$

-- eliminar usuario
create or replace procedure Usu_eliminar(
   idEliminar int
)
LANGUAGE SQL   
as $$
 delete from usuario where usu_id= idEliminar
$$


-- get de usuarios
CREATE or replace FUNCTION Usu_ALL() RETURNS table(Nombre varchar, Apellido varchar, Email varchar, 
  Username varchar, id int) AS $$
    
    Select usu_nombre as nombre, usu_apellido as apellido, usu_email as email, usu_username username, usu_id as id 
	from usuario;

$$ LANGUAGE SQL; 

-- get de usuario por email
CREATE or replace FUNCTION Usu_buscar_por_email(
email varchar
) 
RETURNS table(usu_id int, usu_nombre varchar, usu_apellido varchar, usu_email varchar, usu_password varchar,
  usu_username varchar) AS $$
    
    Select * from usuario WHERE usu_email =email;

$$ LANGUAGE SQL; 


