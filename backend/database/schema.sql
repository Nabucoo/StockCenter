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

CREATE TABLE produtos (
	id INT AUTO_INCREMENT PRIMARY KEY,
    
    nome VARCHAR(100) NOT NULL,
    
    quantidade INT NOT NULL,
    
    preco_compra DECIMAL(10, 2) NOT NULL,
    
    preco_venda DECIMAL(10, 2) NOT NULL,
    
    departamento VARCHAR(100),
    
    id_administrador INT,
    
	CONSTRAINT fk_produto_administrador
	FOREIGN KEY (id_administrador)
	REFERENCES usuarios(id)
);

CREATE TABLE movimentacoes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	
    id_funcionario INT,

    id_administrador INT,
    
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
	produto VARCHAR(100),
    
    quantidade VARCHAR(100),
    
    valor_total DECIMAL(10, 2) NOT NULL,
    
    tipo ENUM("entrada", "saida"),
		
	CONSTRAINT fk_movimentacao_funcionario
	FOREIGN KEY (id_funcionario)
	REFERENCES usuarios(id),

    CONSTRAINT fk_movimentacao_administrador
    FOREIGN KEY (id_administrador)
    REFERENCES usuarios(id)
);




INSERT INTO usuarios (nome, email, senha, tipo) VALUES 
(
	'admin',
	'admin@gmail.com',
    'Admin123*',
    'ADMIN'
);
