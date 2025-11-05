import express from "express";
import {
    listarFavoritos,
    adicionarFavorito,
    removerFavorito
} from "../controllers/favorito.controller.js";

const router = express.Router();

// favoritos //
router.get("/", listarFavoritos);
router.post("/", adicionarFavorito);
router.delete("/:id", removerFavorito);

export default router;