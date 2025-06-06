CREATE TABLE Utilizadores (
    IdUtilizador INT PRIMARY KEY AUTO_INCREMENT,
    nomeUtilizador VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    cargo ENUM('Utilizador', 'administrador', 'Membros do Concelho', 'coordenador', 'secretariado') DEFAULT 'Utilizador',
    email VARCHAR(150)
);

CREATE TABLE Reunioes (
    IdReuniao INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    local VARCHAR(150),
    ata VARCHAR(255),
    estado ENUM('Por começar', 'Em progresso', 'Acabada') DEFAULT 'Por começar'
);

CREATE TABLE Atividades (
    IdAtividade INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    local VARCHAR(150),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    idResponsavel INT,
    estado ENUM('Ainda não foi realizada', 'Em progresso', 'Realizada') DEFAULT 'Ainda não foi realizada',
    FOREIGN KEY (idResponsavel) REFERENCES Utilizadores(idUtilizador)
);

CREATE TABLE Fotos (
    IdFoto INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    descricao TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    idAtividade INT,
    idReuniao INT,
    FOREIGN KEY (idAtividade) REFERENCES Atividades(idAtividade),
    FOREIGN KEY (idReuniao) REFERENCES Reunioes(idReuniao)
);

CREATE TABLE Inscritos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    IdUtilizador INT NOT NULL,
    IdAtividade INT NOT NULL,
    FOREIGN KEY (IdUtilizador) REFERENCES Utilizadores(IdUtilizador),
    FOREIGN KEY (IdAtividade) REFERENCES Atividades(IdAtividade)
);


-- Sample data insert:
INSERT INTO Utilizadores (nomeUtilizador, `password`, cargo, email) VALUES
('admin', 'Esmad', 'administrador', 'admin@eco.com'),
('utilizador', 'Esmad', 'Utilizador', 'utilizador@eco.com');
