import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================

export async function listarAvaliacoes (req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM avaliacoes");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function criarAvaliacao (req, res) {
    try {
        const { id_usuario, id_livro, nota, comentario } = req.body;
        if (!id_usuario || !id_livro || !nota || !comentario)       
            return res.status(400).json({ erro: "Campos obrigatórios" });
        await db.execute(
            "INSERT INTO avaliacoes (id_usuario, id_livro, nota, comentario) VALUES (?, ?, ?, ?)",
            [id_usuario, id_livro, nota, comentario]
        );
        res.json({ mensagem: "Avaliação criada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }   
};


