
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

 --obtener la cantidad de dispositivos que aceptaron la notificación
CREATE or replace FUNCTION notificaciones_cantidad_dispositivos() RETURNS table(cantidad bigint) AS $$
 
select count(*) AS Cantidad from notificaciones

$$ LANGUAGE SQL; 

