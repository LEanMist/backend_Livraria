import express from "express"
import { 
    listarAvaliacoes,
    criarAvaliacao,
} from "../controllers/avaliação.controller.js"

const router = express.Router();

// avaliações //
router.get("/", listarAvaliacoes);
router.post("/", criarAvaliacao);

export default router;