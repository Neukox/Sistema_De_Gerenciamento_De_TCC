import { Router } from "express";
import authorization from "../middlewares/authorization";
import getAllAlunosController from "../controllers/aluno/getAllController";

const alunosRoutes = Router();

// rota para obter todos os alunos
alunosRoutes.get("/", [authorization], getAllAlunosController);

export default alunosRoutes;
