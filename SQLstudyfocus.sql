CREATE DATABASE dbStudyFocus;
GO

USE dbStudyFocus;
GO

CREATE TABLE USUARIO (
    id_usuario   INT           IDENTITY(1,1) NOT NULL,
    nombre       NVARCHAR(100) NOT NULL,
    correo       NVARCHAR(150) NOT NULL,
    [contraseña] NVARCHAR(255) NOT NULL,
    carrera      NVARCHAR(100) NULL,
    ciclo        TINYINT       NULL,
    CONSTRAINT PK_USUARIO        PRIMARY KEY (id_usuario),
    CONSTRAINT UQ_USUARIO_correo UNIQUE (correo),
    CONSTRAINT CK_USUARIO_ciclo  CHECK (ciclo BETWEEN 1 AND 20)
);
GO

CREATE TABLE METODO_ESTUDIO (
    id_metodo    INT           IDENTITY(1,1) NOT NULL,
    nombre       NVARCHAR(80)  NOT NULL,
    descripcion  NVARCHAR(500) NULL,
    CONSTRAINT PK_METODO_ESTUDIO        PRIMARY KEY (id_metodo),
    CONSTRAINT UQ_METODO_ESTUDIO_nombre UNIQUE (nombre)
);
GO

CREATE TABLE NOTA_CORNELL (
    id_nota     INT           IDENTITY(1,1) NOT NULL,
    id_usuario  INT           NOT NULL,
    tema        NVARCHAR(150) NOT NULL,
    clave       NVARCHAR(MAX) NULL,
    apunte      NVARCHAR(MAX) NULL,
    resumen     NVARCHAR(MAX) NULL,
    CONSTRAINT PK_NOTA_CORNELL         PRIMARY KEY (id_nota),
    CONSTRAINT FK_NOTA_CORNELL_USUARIO FOREIGN KEY (id_usuario)
        REFERENCES USUARIO (id_usuario) ON DELETE CASCADE
);
GO

CREATE TABLE SESION_ESTUDIO (
    id_sesion      INT          IDENTITY(1,1) NOT NULL,
    id_usuario     INT          NOT NULL,
    id_metodo      INT          NOT NULL,
    fecha          DATETIME2(0) NOT NULL
                   CONSTRAINT DF_SESION_ESTUDIO_fecha DEFAULT SYSDATETIME(),
    concentracion  TINYINT      NOT NULL,
    CONSTRAINT PK_SESION_ESTUDIO         PRIMARY KEY (id_sesion),
    CONSTRAINT FK_SESION_ESTUDIO_USUARIO FOREIGN KEY (id_usuario)
        REFERENCES USUARIO (id_usuario) ON DELETE CASCADE,
    CONSTRAINT FK_SESION_ESTUDIO_METODO  FOREIGN KEY (id_metodo)
        REFERENCES METODO_ESTUDIO (id_metodo),
    CONSTRAINT CK_SESION_ESTUDIO_concentracion CHECK (concentracion BETWEEN 1 AND 5)
);
GO

CREATE TABLE EVENTO_CALENDARIO (
    id_evento   INT           IDENTITY(1,1) NOT NULL,
    id_usuario  INT           NOT NULL,
    titulo      NVARCHAR(150) NOT NULL,
    fecha       DATETIME2(0)  NOT NULL,
    tipo        NVARCHAR(30)  NULL,
    CONSTRAINT PK_EVENTO_CALENDARIO         PRIMARY KEY (id_evento),
    CONSTRAINT FK_EVENTO_CALENDARIO_USUARIO FOREIGN KEY (id_usuario)
        REFERENCES USUARIO (id_usuario) ON DELETE CASCADE
);
GO