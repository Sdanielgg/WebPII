CREATE TABLE Utilizador (
    idUtilizador INT PRIMARY KEY AUTO_INCREMENT,
    nomeUtilizador VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    cargo ENUM('administrador', 'Membros do Concelho', 'coordenador', 'secretariado') DEFAULT 'Utilizador',
    email VARCHAR(150),x
    medalhas TEXT
);
CREATE TABLE Reuniao (
    idReuniao INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    local VARCHAR(150),
    ata VARCHAR(255),
    fotos TEXT,
    convidados TEXT,
    estado ENUM('Por começar', 'Em progresso', 'Acabada') DEFAULT 'Por começar'
);

CREATE TABLE Atividades (
    idAtividade INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    local VARCHAR(150),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    responsavel TEXT,
    inscritos TEXT,
    fotos TEXT,
    estado ENUM('Ainda não foi realizada', 'Em progresso', 'Realizada') DEFAULT 'Ainda não foi realizada'
);



INSERT INTO Utilizadores (nomeUtilizador, password, cargo,email) VALUES
('admin', 'Esmad', 'Administrador','admin@eco.com'),
('utilizador', 'Esmad', 'Utilizador','utilizador@eco.com');

INSERT INTO Posts (title, description, published, views, publishedAt, author) VALUES
('Introdução ao Node.js', 'Aprende os conceitos base de Node.js', true, 120, '2024-12-10', 1),
('Como criar uma API REST', 'Tutorial completo para iniciantes', false, 0, NULL, 3),
('Melhores práticas de segurança', 'Dicas para proteger as tuas apps web', true, 35, '2025-02-20', 1);




-- Post 1: Introdução ao Node.js
INSERT INTO PostTags (PostId, TagName) VALUES (1, 'node'), (1, 'tutorial');

-- Post 2: Como criar uma API REST
INSERT INTO PostTags (PostId, TagName) VALUES (2, 'node'), (2, 'backend'), (2, 'api'), (2, 'tutorial');

-- Post 3: Melhores práticas de segurança
INSERT INTO PostTags (PostId, TagName) VALUES (3, 'backend'), (3, 'segurança');