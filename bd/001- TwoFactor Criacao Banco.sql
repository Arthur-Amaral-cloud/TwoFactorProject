DROP DATABASE IF EXISTS TwoFactor;
CREATE DATABASE IF NOT EXISTS TwoFactor;

USE TwoFactor;

CREATE TABLE Permissao (

idPermissao 	INT PRIMARY KEY AUTO_INCREMENT,

nomePermissao 	VARCHAR(100) NOT NULL,

descricao 		VARCHAR(500)
);

CREATE TABLE MeioAutenticacao (

idMeioAutenticacao 	INT PRIMARY KEY AUTO_INCREMENT,

tipoAutenticacao 	VARCHAR(100) NOT NULL,

descricao 			VARCHAR(500)
);

CREATE TABLE Usuario (

idUsuario INT,

fkPermissao INT,

CONSTRAINT pkCompostaUsuario PRIMARY KEY(idUsuario, fkPermissao),

nome VARCHAR(100) NOT NULL,

email VARCHAR(100) NOT NULL,

senha VARCHAR(256) NOT NULL,

dataCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fkUsuarioPermissao FOREIGN KEY (fkPermissao) REFERENCES Permissao(idPermissao)
);

CREATE TABLE CodigoRecuperacao (

idCodigoRecuperacao INT,

fkUsuario INT,

fkPermissao INT,

CONSTRAINT pkCompostaCodigoRecuperacao PRIMARY KEY (idCodigoRecuperacao, fkUsuario, fkPermissao),

codigo CHAR(6) NOT NULL,

dataGeracao DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fkCodigoRecuperacaoUsuario FOREIGN KEY (fkUsuario, fkPermissao) REFERENCES Usuario(idUsuario, fkPermissao)
);

CREATE TABLE AutenticacaoEscolhida (

idAutenticacaoEscolhida INT,

fkUsuario INT,

fkPermissao INT,

fkMeioAutenticacao INT,

CONSTRAINT pkCompostaAutenticacaoEscolhida PRIMARY KEY (idAutenticacaoEscolhida, fkUsuario, fkPermissao, fkMeioAutenticacao),

dataConfiguracao DATETIME DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fkAutenticacaoEscolhidaMeioAutenticacao FOREIGN KEY (fkMeioAutenticacao) REFERENCES MeioAutenticacao(idMeioAutenticacao),

CONSTRAINT fkAutenticacaoEscolhidaUsuario FOREIGN KEY (fkUsuario, fkPermissao) REFERENCES Usuario(idUsuario, fkPermissao)
);

DROP USER IF EXISTS twofactor;
CREATE USER 'twofactor'@'%' IDENTIFIED BY 'senha-segura123';
GRANT INSERT, SELECT, UPDATE, DELETE ON TwoFactor.* TO 'twofactor'@'%';
FLUSH PRIVILEGES; 