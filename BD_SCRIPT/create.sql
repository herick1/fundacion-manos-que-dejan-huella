CREATE TABLE ROL(
  ROL_ID SERIAL,
  ROL_NOMBRE VARCHAR(20) NOT NULL,
  CONSTRAINT PRIMARYKEY_ROLE PRIMARY KEY (ROL_ID)
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


CREATE TABLE CONTACTANOS(
ID SERIAL,
mensaje VARCHAR(300),
nombre VARCHAR(100),
email VARCHAR(100),
IP VARCHAR(100),
click_time timestamp

);