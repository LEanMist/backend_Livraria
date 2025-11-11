import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================

export async function listarFavoritos(req, res) {
    try {
        const [rows] = await db.execute(`
            SELECT f.id, u.nome AS usuario_nome, l.titulo AS livro_titulo, f.data_favoritado
            FROM favoritos f
            JOIN usuarios u ON f.usuario_id = u.id
            JOIN livros l ON f.livro_id = l.id
        `);
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }   
};

export async function adicionarFavorito(req, res) {
    try{
        const{ usuario_id, livro_id } = req.body;
        if (!usuario_id || !livro_id)       
            return res.status(400).json({ erro: "Campos obrigatórios" });
        await db.execute(
            "INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)",
            [usuario_id, livro_id]
        );
        res.json({ mensagem: "Adicionado aos Favoritos!👌" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }   
};

export async function removerFavorito(req, res) {
    try {
        await db.execute("DELETE FROM favoritos WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "saiu dos favoritos🫵👎!" });
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
}