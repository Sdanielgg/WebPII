SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables in order that avoids FK conflicts
DROP TABLE IF EXISTS PostTags;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS inscritos_reunioes;
DROP TABLE IF EXISTS inscritos_atividades;
DROP TABLE IF EXISTS medalhas;
DROP TABLE IF EXISTS Fotos;
DROP TABLE IF EXISTS Atividades;
DROP TABLE IF EXISTS Reunioes;
DROP TABLE IF EXISTS Utilizador;

-- Create Utilizador table
CREATE TABLE Utilizador (
    idUtilizador INT PRIMARY KEY AUTO_INCREMENT,
    nomeUtilizador VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    cargo ENUM('Utilizador', 'administrador', 'Membros do Concelho', 'coordenador', 'secretariado') DEFAULT 'Utilizador',
    email VARCHAR(150)
);

-- Create Reunioes table
CREATE TABLE Reunioes (
    idReuniao INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    local VARCHAR(150),
    ata VARCHAR(255),
    estado ENUM('Por começar', 'Em progresso', 'Acabada') DEFAULT 'Por começar'
);

-- Create Atividades table
CREATE TABLE Atividades (
    idAtividade INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    local VARCHAR(150),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    idResponsavel INT,
    estado ENUM('Ainda não foi realizada', 'Em progresso', 'Realizada') DEFAULT 'Ainda não foi realizada',
    FOREIGN KEY (idResponsavel) REFERENCES Utilizador(idUtilizador)
);

-- Create Fotos table
CREATE TABLE Fotos (
    idFoto INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    descricao TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    idAtividade INT,
    idReuniao INT,
    FOREIGN KEY (idAtividade) REFERENCES Atividades(idAtividade),
    FOREIGN KEY (idReuniao) REFERENCES Reunioes(idReuniao)
);

-- Create medalhas table
CREATE TABLE medalhas (
    idMedalha INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    idUtilizador INT NOT NULL,
    FOREIGN KEY (idUtilizador) REFERENCES Utilizador(idUtilizador)
);

-- Create inscritos_atividades table (junction table)
CREATE TABLE inscritos_atividades (
    idInscricao INT PRIMARY KEY AUTO_INCREMENT,
    idUtilizador INT NOT NULL,
    idAtividade INT NOT NULL,
    FOREIGN KEY (idUtilizador) REFERENCES Utilizador(idUtilizador),
    FOREIGN KEY (idAtividade) REFERENCES Atividades(idAtividade)
);

-- Create inscritos_reunioes table (junction table)
CREATE TABLE inscritos_reunioes (
    idInscricao INT PRIMARY KEY AUTO_INCREMENT,
    idUtilizador INT NOT NULL,
    idReuniao INT NOT NULL,
    FOREIGN KEY (idUtilizador) REFERENCES Utilizador(idUtilizador),
    FOREIGN KEY (idReuniao) REFERENCES Reunioes(idReuniao)
);

-- Insert sample data into Utilizador
INSERT INTO Utilizador (nomeUtilizador, `password`, cargo, email) VALUES
('admin', 'Esmad', 'administrador', 'admin@eco.com'),
('utilizador', 'Esmad', 'Utilizador', 'utilizador@eco.com');
