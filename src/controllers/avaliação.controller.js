import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================

export async function listarAvaliacoes (req, res) {
    try {
        const [rows] = await db.query(`
            SELECT a.id, a.nota, a.comentario, u.nome AS usuario_nome, l.titulo AS livro_titulo
            FROM avaliacoes a
            JOIN usuarios u ON a.usuario_id = u.id
            JOIN livros l ON a.livro_id = l.id
        `);
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function criarAvaliacao (req, res) {
    try {
        const { usuario_id, livro_id, nota, comentario } = req.body;
        if (!usuario_id || !livro_id || !nota || !comentario)       
            return res.status(400).json({ erro: "Campos obrigatórios" });
        if (nota < 1 || nota > 10){
            return res.status(400).json({ erro: "A nota deve estar entre 1 e 10" });
        }
        await db.execute(
            "INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario) VALUES (?, ?, ?, ?)",
            [usuario_id, livro_id, nota, comentario]
        );
        res.json({ mensagem: "Avaliação criada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }   
};


