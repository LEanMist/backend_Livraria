import express from "express"
import { 
    listarLivros,
    buscarLivro,
    criarLivro,
    atualizarLivro, 
    excluirLivro 
} from "../controllers/livro.controller.js"


const router = express.Router();

// usuarios //
router.get("/", listarLivros);
router.post("/", buscarLivro);
router.get("/:id", criarLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", excluirLivro);

export default router;
