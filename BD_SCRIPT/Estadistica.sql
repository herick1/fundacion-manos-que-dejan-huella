
SET TIMEZONE='America/Caracas'

set lc_time='es_ES.UTF-8';

CREATE TABLE USO_APP (
ID SERIAL,
Dispositivo VARCHAR(100) NOT NULL,
Modulo VARCHAR(100),
fecha date default CURRENT_DATE
)

-- Inserta uso
create or replace procedure Uso_App_Insertar(
  dispositivo VARCHAR,
  modulo VARCHAR
)
LANGUAGE SQL   
as $$
INSERT INTO USO_APP (Dispositivo,Modulo) values(dispositivo,modulo);
$$

--visitas por mes
CREATE or replace FUNCTION estadisticas_grafica_mes(yearEnviado double precision) RETURNS table(mes varchar, cantidad bigint) AS $$
 set lc_time='es_ES.UTF-8';
  SELECT  T.mes, T.cantidad from (
  SELECT to_char(fecha, 'TMMonth') Mes , date_part('month', fecha) numero, count(id) AS Cantidad 
  FROM uso_app WHERE date_part('year', fecha)=yearEnviado
  group by to_char(fecha, 'TMMonth'), date_part('month', fecha)

) T
order by T.numero asc
$$ LANGUAGE SQL; 
 

--visitas por mes y dispositivo
CREATE or replace FUNCTION estadisticas_grafica_mes_dispositivo(yearEnviado double precision) 
RETURNS table(mes varchar, dispositivo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';

SELECT  T.mes, T.dispositivo, T.cantidad from (
SELECT  to_char(fecha, 'TMMonth') mes, dispositivo,  date_part('month', fecha) numero,
count(id) AS Cantidad FROM uso_app WHERE date_part('year', fecha)=yearEnviado
  group by to_char(fecha, 'TMMonth'), dispositivo,date_part('month', fecha)
)T
order by T.numero asc
$$ LANGUAGE SQL; 

--visitas por mes y Modulo
CREATE or replace FUNCTION estadisticas_grafica_mes_modulo(yearEnviado double precision) RETURNS table(mes varchar, modulo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';
  SELECT  T.mes, T.modulo, T.cantidad from (
SELECT  to_char(fecha, 'TMMonth') mes ,modulo, date_part('month', fecha) numero, 
count(id) AS Cantidad FROM uso_app WHERE date_part('year', fecha)=yearEnviado
group by to_char(fecha, 'TMMonth'), modulo, date_part('month', fecha)

) T
order by T.numero asc
$$ LANGUAGE SQL; 


--visitas por Modulo
CREATE or replace FUNCTION estadisticas_grafica_modulo(yearEnviado double precision) RETURNS table(modulo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';
  SELECT  T.modulo, T.cantidad from (
SELECT  modulo, count(id) AS Cantidad FROM uso_app WHERE date_part('year', fecha)=yearEnviado
group by  modulo
) T
order by T.cantidad asc
$$ LANGUAGE SQL; 

-- Visitas por dispositivo
CREATE or replace FUNCTION estadisticas_grafica_dispositivo(yearEnviado double precision) RETURNS table(dispositivo varchar, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';
SELECT  T.dispositivo, T.cantidad from (
SELECT  dispositivo, count(id) AS Cantidad FROM uso_app WHERE date_part('year', fecha)=yearEnviado
 group by  dispositivo
) T
order by T.cantidad asc
$$ LANGUAGE SQL; 

--visitas por año

CREATE or replace FUNCTION estadisticas_grafica_año(yearEnviado double precision) RETURNS table(año double precision, cantidad bigint) AS $$
set lc_time='es_ES.UTF-8';

  SELECT date_part('year', fecha) año , count(id) AS Cantidad 
  FROM uso_app WHERE date_part('year', fecha)=yearEnviado group by date_part('year', fecha)
  order by date_part('year', fecha) asc
  
$$ LANGUAGE SQL; 


CREATE or replace FUNCTION estadisticas_get_año() RETURNS table(año double precision) AS $$
set lc_time='es_ES.UTF-8';

  SELECT distinct date_part('year', fecha) año
  FROM uso_app
  order by date_part('year', fecha) asc
  
$$ LANGUAGE SQL; 
