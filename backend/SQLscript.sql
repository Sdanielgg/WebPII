CREATE TABLE Utilizador (
    idUtilizador INT PRIMARY KEY AUTO_INCREMENT,
    nomeUtilizador VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    cargo ENUM('Utilizador','administrador', 'Membros do Concelho', 'coordenador', 'secretariado') DEFAULT 'Utilizador',
    email VARCHAR(150),
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

CREATE TABLE Fotos(
    idFoto INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    descricao TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    idAtividade INT NOT NULL,
    FOREIGN KEY (idAtividade) REFERENCES Atividades(idAtividade)
);
CREATE TABLE medalhas(
    idMedalha INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    idUtilizador INT NOT NULL,
    FOREIGN KEY (idUtilizador) REFERENCES Utilizador(idUtilizador)
);

CREATE TABLE inscritos_atividades (
    idInscricao INT PRIMARY KEY AUTO_INCREMENT,
    idUtilizador INT NOT NULL,
    idAtividade INT NOT NULL,
    FOREIGN KEY (idUtilizador) REFERENCES Utilizador(idUtilizador),
    FOREIGN KEY (idAtividade) REFERENCES Atividades(idAtividade)
);
CREATE TABLE inscritos_reunioes (
    idInscricao INT PRIMARY KEY AUTO_INCREMENT,
    idUtilizador INT NOT NULL,
    idReuniao INT NOT NULL,
    FOREIGN KEY (idUtilizador) REFERENCES Utilizador(idUtilizador),
    FOREIGN KEY (idReuniao) REFERENCES Reuniao(idReuniao)
);
INSERT INTO Utilizador (nomeUtilizador, password, cargo,email) VALUES
('admin', 'Esmad', 'Administrador','admin@eco.com'),
('utilizador', 'Esmad', DEFAULT,'utilizador@eco.com');