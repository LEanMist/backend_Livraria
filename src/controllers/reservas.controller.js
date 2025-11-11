import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================

export async function listarReservas (req, res) {
    try{
        const[rows] = await db.execute(`
            SELECT r.id, u.nome AS usuario_nome, l.titulo AS livro_titulo, r.data_retirada, r.data_devolucao, r.confirmado_email, r.criado_em
            FROM reservas r
            JOIN usuarios u ON r.usuario_id = u.id
            JOIN livros l ON r.livro_id = l.id
        `);
        res.json(rows);
    }catch (err) {
        res.status(500).json({ erro: err.message });
    }   
};

export async function criarReserva (req, res) {
    try{
        const{ usuario_id, livro_id, data_retirada, data_devolucao,} = req.body;
        if(!usuario_id || !livro_id || !data_retirada || !data_devolucao)
            return res.status(400).json({ erro: "Campos obrigatórios" });
        await db.execute(
            "INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao) VALUES (?, ?, ?, ?)",
            [usuario_id, livro_id, data_retirada, data_devolucao]
        );
        res.json({ mensagem: "reserva criada com sucesso!👌" });
    }catch (erro){
        res.status(500).json({ erro: err.message });
    }
};

export async function excluirReserva (req, res) {
    try {
        await db.execute("DELETE FROM reservas WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Você acabou de deletar das reservas📗🔥!" });
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
};