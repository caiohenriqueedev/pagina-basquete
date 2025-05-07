CREATE DATABASE esporteDB;

USE esporteDB;

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogador VARCHAR(100),
    votos INT DEFAULT 0
);

-- Inserir jogadores na tabela de votos
INSERT INTO votos (jogador, votos) VALUES ('Jogador 1', 0), ('Jogador 2', 0);
