CREATE DATABASE IF NOT EXISTS stockcenter;

USE stockcenter;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    senha VARCHAR(255) NOT NULL,

    ativo TINYINT(1) DEFAULT 1,

    tipo ENUM('ADMIN', 'FUNCIONARIO') NOT NULL,

    id_administrador INT,

    CONSTRAINT fk_usuario_administrador
        FOREIGN KEY (id_administrador)
        REFERENCES usuarios(id)
);