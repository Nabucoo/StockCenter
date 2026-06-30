INSERT INTO usuarios (nome, email, senha, tipo, id_administrador)
VALUES
-- Administradores
('admin1', 'admin1@gmail.com', '12345678', 'ADMIN', NULL),
('admin2', 'admin2@gmail.com', '12345678', 'ADMIN', NULL);

INSERT INTO usuarios (nome, email, senha, tipo, id_administrador)
VALUES
-- Funcionários do admin1
('funcionario1', 'funcionario1@gmail.com', '12345678', 'FUNCIONARIO', 1),
('funcionario2', 'funcionario2@gmail.com', '12345678', 'FUNCIONARIO', 1),

-- Funcionários do admin2
('funcionario3', 'funcionario3@gmail.com', '12345678', 'FUNCIONARIO', 2),
('funcionario4', 'funcionario4@gmail.com', '12345678', 'FUNCIONARIO', 2);
