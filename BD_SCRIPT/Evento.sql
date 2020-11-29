CREATE TABLE EVENTO(
  EVE_ID SERIAL,
  EVE_NOMBRE VARCHAR(60) NOT NULL,
  EVE_FECHA_INI DATE,
  EVE_FECHA_FIN DATE,
  EVE_DESCRIPCION VARCHAR(300),
  EVE_DIRECCION VARCHAR(200),
  eve_nombre_imagen VARCHAR(100), 
  eve_url VARCHAR(400)

  CONSTRAINT PRIMARYKEY_EVENTO PRIMARY KEY (EVE_ID)
);

-- Crear Evento
create or replace procedure Eve_crear(
  nombre VARCHAR,
  fecha_ini DATE,
  fecha_fin DATE,
  descripcion VARCHAR,
  direccion VARCHAR,
  nombre_imagen VARCHAR,
  url VARCHAR 
)
LANGUAGE SQL   
as $$
	INSERT INTO EVENTO (EVE_NOMBRE,EVE_FECHA_INI,EVE_FECHA_FIN,EVE_DESCRIPCION,EVE_DIRECCION, 
	EVE_NOMBRE_IMAGEN, EVE_URL) values(nombre,fecha_ini,fecha_fin,descripcion,direccion,nombre_imagen, url)

$$

-- Actualizar Evento
create or replace procedure Eve_actualizar(
  idActualizar INT,
  nombre VARCHAR,
  fecha_ini DATE,
  fecha_fin DATE,
  descripcion VARCHAR,
  direccion VARCHAR,
  nombre_imagen VARCHAR,
  url VARCHAR 
)
LANGUAGE SQL   
as $$

UPDATE EVENTO SET EVE_NOMBRE=nombre ,EVE_FECHA_INI=fecha_ini ,EVE_FECHA_FIN=
   	fecha_fin, EVE_DESCRIPCION=descripcion, EVE_DIRECCION=direccion,EVE_NOMBRE_IMAGEN = nombre_imagen, 
	EVE_URL=url
    WHERE eve_id=idActualizar
$$


-- Eliminar Evento
create or replace procedure Eve_eliminar(
  idEliminar INT
)
LANGUAGE SQL   
as $$

DELETE FROM EVENTO where eve_id= idEliminar

$$


--obtener todos los eventos
CREATE or replace FUNCTION eventos_all() RETURNS table(id int, nombre VARCHAR(100), fecha_inicio VARCHAR(200), fecha_fin VARCHAR(200), descripcion varchar(300), direccion varchar(200), Imagen varchar(100), Url varchar(400)) AS $$
 set lc_time='es_ES.UTF-8';
 
SELECT eve_id AS Id, eve_nombre AS Nombre, to_char(eve_fecha_ini, 'DD-MM-YYYY') AS Fecha_inicio, 
to_char(eve_fecha_fin, 'DD-MM-YYYY') AS Fecha_fin, eve_descripcion AS Descripción,
eve_direccion AS Dirección, eve_nombre_imagen AS Imagen, eve_url AS Url FROM evento
order by id desc;

$$ LANGUAGE SQL; 
 
 --obtener los ultimos 3 eventos
CREATE or replace FUNCTION top3_eventos_imagenes() RETURNS table(id int, Nombre VARCHAR(100), 
Descripcion VARCHAR(300), Url varchar(400)) AS $$
 set lc_time='es_ES.UTF-8';
 
SELECT eve_id, eve_nombre, eve_descripcion, eve_url AS Url FROM evento where eve_url is not null
order by eve_id desc limit 3;

$$ LANGUAGE SQL; 

