import { Router } from "express";
import createReuniaoController from "../controllers/reunioes/createreunioes";
import { getReunioes } from "../controllers/reunioes/getReunioes";
import { getReuniaoById } from "../controllers/reunioes/getReuniaoById";
import updateReuniao from "../controllers/reunioes/updateReuniao";
import { deleteReuniao } from "../controllers/reunioes/deleteReuniao";
import authorization from "../middlewares/authorization";

/**
 * Arquivo de rotas para reuniões
 * Este arquivo define as rotas relacionadas ao CRUD de reuniões
 */

const reunioesRoutes = Router();

// Todas as rotas de reuniões requerem autenticação
reunioesRoutes.use(authorization);

// Rota para criar uma nova reunião
// POST /api/reunioes
reunioesRoutes.post("/", createReuniaoController);

// Rota para listar reuniões (com filtros e paginação)
// GET /api/reunioes?tcc_id=1&status=AGENDADA&page=1&limit=10
reunioesRoutes.get("/", getReunioes);

// Rota para buscar uma reunião específica por ID
// GET /api/reunioes/:id
reunioesRoutes.get("/:id", getReuniaoById);

// Rota para atualizar uma reunião
// PUT /api/reunioes/:id
reunioesRoutes.put("/:id", updateReuniao);

// Rota para deletar/cancelar uma reunião
// DELETE /api/reunioes/:id?forceDelete=true
reunioesRoutes.delete("/:id", deleteReuniao);

// Exporta as rotas de reuniões
export default reunioesRoutes;
