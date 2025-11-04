import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================

export async function listarLivros (req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM livros");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function buscarLivro (req, res) {
  try {
    const { titulo } = req.body;
    const [rows] = await db.execute("SELECT * FROM livros WHERE titulo LIKE ?", [`%${titulo}%`]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function criarLivro (req, res) {
    try {
        const { titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse, ativo } = req.body;
        if (!titulo || !autor || !genero || !editora || !ano_publicacao || !isbn || !idioma || !formato || !caminho_capa || !sinopse || !ativo)
            return res.status(400).json({ erro: "Campos obrigatórios" });
        await db.execute(
            "INSERT INTO livros (titulo, autor, genero, editora, ano_publicação, isbn, idioma, formato, caminho_capa, sinopse, ativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse, ativo]
        );
        res.json({ mensagem: "Livro criado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }  
};

export async function atualizarLivro (req, res) {
    try {
        const { titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse, ativo } = req.body;
        await db.execute(
            "UPDATE livros SET titulo = ?, autor = ?, genero = ?, editora = ?, ano_publicação = ?, isbn = ?, idioma = ?, formato = ?, caminho_capa = ?, sinopse = ?, ativo = ? WHERE id = ?",
            [titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse, ativo, req.params.id]
        );
        res.json({ mensagem: "Livro atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function excluirLivro (req, res) {
    try {
        await db.execute("DELETE FROM livros WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Livro excluído com sucesso!" });
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
