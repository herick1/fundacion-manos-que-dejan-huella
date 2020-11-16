CREATE TABLE ROL(
  ROL_ID SERIAL,
  ROL_NOMBRE VARCHAR(20) NOT NULL,
  CONSTRAINT PRIMARYKEY_ROLE PRIMARY KEY (ROL_ID)
);

CREATE TABLE USUARIO(
  USU_ID SERIAL,
  USU_NOMBRE VARCHAR(100) NOT NULL,
  USU_APELLIDO VARCHAR(100) NOT NULL,
  USU_EMAIL VARCHAR(200) NOT NULL UNIQUE,
  USU_PASSWORD VARCHAR(200) NOT NULL,
  CONSTRAINT PRIMARYKEY_USUARIO PRIMARY KEY (USU_ID)
);

CREATE TABLE EVENTO(
  EVE_ID SERIAL,
  EVE_NOMBRE VARCHAR(60) NOT NULL,
  EVE_FECHA_INI DATE,
  EVE_FECHA_FIN DATE,
  EVE_DESCRIPCION VARCHAR(300),
  EVE_DIRECCION VARCHAR(200),
  CONSTRAINT PRIMARYKEY_EVENTO PRIMARY KEY (EVE_ID)
);

CREATE TABLE USUARIO_ROL(
  USU_ROL_ID SERIAL,
  USU_ROL_FK_USU_ID SERIAL NOT NULL,
  USU_ROL_FK_ROL_ID SERIAL NOT NULL,
  CONSTRAINT PRIMARYKEY_USU_ROL PRIMARY KEY (USU_ROL_ID),
  CONSTRAINT FOREIGN_USU_ROL_USUARIO FOREIGN KEY (USU_ROL_FK_USU_ID) REFERENCES USUARIO(USU_ID),
  CONSTRAINT FOREIGN_USU_ROL_ROL FOREIGN KEY (USU_ROL_FK_ROL_ID) REFERENCES ROL(ROL_ID)
);
  
CREATE TABLE USU_EVE(
  USU_EVE_ID SERIAL,
  USU_EVE_FK_USU_ID SERIAL NOT NULL,
  USU_EVE_FK_EVE_ID SERIAL NOT NULL,
  CONSTRAINT PRIMARYKEY_USU_EVE PRIMARY KEY (USU_EVE_ID),
  CONSTRAINT FOREIGN_USU_EVE_USUARIO FOREIGN KEY (USU_EVE_FK_USU_ID) REFERENCES USUARIO(USU_ID),
  CONSTRAINT FOREIGN_USU_EVE_EVE FOREIGN KEY (USU_EVE_FK_EVE_ID) REFERENCES EVENTO(EVE_ID)
);

CREATE TABLE notificaciones(
NOT_ID serial,
endpoint VARCHAR(400) UNIQUE,
expiration_time float,
p256dh VARCHAR(400),
auth VARCHAR(400),
email VARCHAR(100),
constraint constraint_unico_notificaciones unique(endpoint,p256dh,auth)
)

-- registrarse
create or replace procedure Not_suscribir(
   endpoint VARCHAR(400),
   time_exp FLOAT, 
   p256dh VARCHAR(400),
   auth VARCHAR(400)
)
LANGUAGE SQL   
as $$

INSERT INTO notificaciones (endpoint,expiration_time,p256dh,auth) values(endpoint,time_exp,p256dh,auth)
$$

-- Obtener todas las subscripciones


CREATE or replace FUNCTION Not_ALL() RETURNS table(endpoint varchar, expiration_time float, p256dh varchar, 
  auth varchar) AS $$
    
    SELECT endpoint, expiration_time, p256dh, auth FROM notificaciones;
$$ LANGUAGE SQL; 

--ELIMINAR SUBSCRIPCION

create or replace procedure Not_delete_especifico(
   endpointParametro VARCHAR(400)
)
LANGUAGE SQL   
as $$

delete from notificaciones noti where noti.endpoint=endpointParametro
$$


SET TIMEZONE='America/Caracas'

set lc_time='es_ES.UTF-8';

CREATE TABLE USO_APP (
ID SERIAL,
Dispositivo VARCHAR(100) NOT NULL,
Modulo VARCHAR(100),
fecha date default CURRENT_DATE
)


--visitas por mes
CREATE or replace FUNCTION estadisticas_grafica_mes() RETURNS table(mes varchar, cantidad bigint) AS $$

 set lc_time='es_ES.UTF-8';
  SELECT  T.mes, T.cantidad from (
  SELECT to_char(fecha, 'TMMonth') Mes , date_part('month', fecha) numero, count(id) AS Cantidad 
  FROM uso_app group by to_char(fecha, 'TMMonth'), date_part('month', fecha)

) T
order by T.numero asc
$$ LANGUAGE SQL; 


--visitas por mes y dispositivo
CREATE or replace FUNCTION estadisticas_grafica_mes_dispositivo() 
RETURNS table(mes varchar, dispositivo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';

SELECT  T.mes, T.dispositivo, T.cantidad from (
SELECT  to_char(fecha, 'TMMonth') mes, dispositivo,  date_part('month', fecha) numero,
count(id) AS Cantidad FROM uso_app group by to_char(fecha, 'TMMonth'), dispositivo,date_part('month', fecha)
)T
order by T.numero asc
$$ LANGUAGE SQL; 

--visitas por mes y Modulo
CREATE or replace FUNCTION estadisticas_grafica_mes_modulo() RETURNS table(mes varchar, modulo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';
  SELECT  T.mes, T.modulo, T.cantidad from (
SELECT  to_char(fecha, 'TMMonth') mes ,modulo, date_part('month', fecha) numero, 
count(id) AS Cantidad FROM uso_app group by to_char(fecha, 'TMMonth'), modulo, date_part('month', fecha)

) T
order by T.numero asc
$$ LANGUAGE SQL; 


--visitas por Modulo
CREATE or replace FUNCTION estadisticas_grafica_modulo() RETURNS table(modulo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';
  SELECT  T.modulo, T.cantidad from (
SELECT  modulo, count(id) AS Cantidad FROM uso_app group by  modulo
) T
order by T.cantidad asc
$$ LANGUAGE SQL; 

-- Visitas por dispositivo
CREATE or replace FUNCTION estadisticas_grafica_dispositivo() RETURNS table(dispositivo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';
SELECT  T.dispositivo, T.cantidad from (
SELECT  dispositivo, count(id) AS Cantidad FROM uso_app group by  dispositivo
) T
order by T.cantidad asc
$$ LANGUAGE SQL; 

--visitas por año

CREATE or replace FUNCTION estadisticas_grafica_año() RETURNS table(año double precision, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';

  SELECT date_part('year', fecha) año , count(id) AS Cantidad 
  FROM uso_app group by date_part('year', fecha)
  order by date_part('year', fecha) asc
  
$$ LANGUAGE SQL; 
