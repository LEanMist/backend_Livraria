-- ===========================================================
-- CRIAÇÃO DO BANCO DE DADOS
-- ===========================================================
CREATE DATABASE IF NOT EXISTS dblivraria;
USE dblivraria;

-- ===========================================================
-- TABELA DE USUÁRIOS
-- ===========================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  data_nascimento DATE,
  celular VARCHAR(20),
  curso VARCHAR(100),
  perfil ENUM('Aluno', 'Admin') DEFAULT 'Aluno'
);

-- ===========================================================
-- DADOS DE USUÁRIOS
-- ===========================================================
INSERT INTO usuarios (nome, email, senha, perfil) VALUES
('Vitor Lima', 'vitor.lima@email.com', '1234', 'Admin'),
('Pedro Campos', 'pedro.campos@email.com', 'abcd', 'Aluno'),
('Pedro Gabriel', 'pedro.gabriel@email.com', 'senha123', 'Aluno'),
('Davi Guedes', 'davi.guedes@email.com', 'teste123', 'Aluno'),
('Matheus Lima', 'matheus.lima@email.com', '3210', 'Aluno');

-- ===========================================================
-- TABELA DE LIVROS
-- ===========================================================
CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(100),
    editora VARCHAR(100),
    ano_publicacao SMALLINT,
    isbn VARCHAR(20),
    idioma VARCHAR(50) DEFAULT 'Português',
    formato ENUM('Físico', 'E-book', 'Audiobook') DEFAULT 'Físico',
    caminho_capa VARCHAR(255),
    sinopse TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================================================
-- DADOS DE LIVROS
-- ===========================================================
INSERT INTO livros (titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse)
VALUES
('Filhas da Lua', 'Carolina França', 'Fantasia / Romance', 'Pandorga', 2018, '9788568263952', 'Português', 'Físico', 'capas/filhasdalua.jpg', 'Trilogia sobre jovens com poderes lunares e uma antiga profecia.'),
('TI para Negócios', 'Edson Perin', 'Tecnologia / Gestão', 'M. Books', 2010, '9788578271541', 'Português', 'E-book', 'capas/tiparanegocios.jpg', 'Mostra como a TI pode impulsionar resultados empresariais.'),
('Mestres do Tempo', 'R. V. Campbell', 'Ficção Científica', 'Arqueiro', 2017, '9788580417432', 'Português', 'Físico', 'capas/mestresdotempo.jpg', 'Explora viagens no tempo e dilemas morais sobre alterar o passado.'),
('O Código Limpo', 'Robert C. Martin', 'Tecnologia / Programação', 'Alta Books', 2009, '9788576082675', 'Português', 'Físico', 'capas/codigolimpo.jpg', 'Guia essencial sobre boas práticas e padrões de código limpo.'),
('Dom Casmurro', 'Machado de Assis', 'Romance Clássico', 'Principis', 1899, '9788580574463', 'Português', 'Físico', 'capas/domcasmurro.jpg', 'Um dos maiores clássicos da literatura brasileira, explorando ciúme e ambiguidade.');

-- ===========================================================
-- TABELA DE AVALIAÇÕES
-- ===========================================================
CREATE TABLE IF NOT EXISTS avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    nota DECIMAL(2,1) CHECK (nota >= 0 AND nota <= 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
);

-- ===========================================================
-- DADOS DE AVALIAÇÕES
-- ===========================================================
INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario)
VALUES
(1, 1, 5.0, 'História envolvente e personagens cativantes.'),
(2, 1, 4.5, 'Ótima leitura, final surpreendente.'),
(3, 2, 4.0, 'Excelente abordagem sobre tecnologia e negócios.'),
(1, 4, 5.0, 'Leitura obrigatória para todo desenvolvedor.'),
(2, 3, 3.5, 'Ideia interessante, mas um pouco confusa em alguns trechos.'),
(3, 5, 4.8, 'Um clássico atemporal, narrativa impecável.');

-- ===========================================================
-- TABELA DE RESERVAS
-- ===========================================================
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_retirada DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    confirmado_email BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
);

-- ===========================================================
-- DADOS DE AVALIAÇÕES
-- ===========================================================
INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao, confirmado_email)
VALUES
(1, 3, '2025-10-20', '2025-11-03', TRUE),
(2, 1, '2025-10-25', '2025-11-08', FALSE),
(3, 5, '2025-10-10', '2025-10-24', TRUE),
(4, 2, '2025-11-01', '2025-11-15', FALSE),
(5, 4, '2025-10-28', '2025-11-11', TRUE),
(1, 2, '2025-11-03', '2025-11-17', FALSE),
(3, 1, '2025-11-02', '2025-11-16', TRUE),
(2, 4, '2025-10-30', '2025-11-13', TRUE),
(4, 5, '2025-10-22', '2025-11-05', FALSE),
(5, 3, '2025-11-04', '2025-11-18', TRUE);

-- ===========================================================
-- TABELA DE RESERVAS
-- ===========================================================
CREATE TABLE IF NOT EXISTS favoritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_favoritado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
);
-- ===========================================================
-- DADOS DE AVALIAÇÕES
-- ===========================================================
INSERT INTO favoritos (usuario_id, livro_id, data_favoritado)
VALUES
(1, 2, '2025-10-05 10:23:45'),
(1, 4, '2025-10-07 14:10:32'),
(2, 1, '2025-10-08 09:45:12'),
(2, 5, '2025-10-12 16:18:05'),
(3, 3, '2025-10-10 11:22:33'),
(3, 1, '2025-10-15 13:30:20'),
(4, 2, '2025-10-20 18:42:55'),
(4, 5, '2025-10-25 08:12:14'),
(5, 4, '2025-10-28 19:05:01'),
(5, 3, '2025-10-30 09:55:44');

