import { Router } from "express";
import authRoutes from "./authRoutes";
import alunosRoutes from "./alunosRoutes";
import professorRoutes from "./professorRoutes";
import TCCRoutes from "./TCCRoutes";
import areaConhecimentoRoutes from "./areaConhecimentoRoutes";

// Arquivo de centralização das rotas da API
// Este arquivo importa e agrupa todas as rotas da API.

const routes = Router();

// Usando as rotas de autenticação
routes.use("/auth", authRoutes);
// Usando as rotas de alunos
routes.use("/alunos", alunosRoutes);
// Usando as rotas de professores
routes.use("/professores", professorRoutes);
// Usando as rotas de TCC
routes.use("/tccs", TCCRoutes);
// Usando as rotas de áreas de conhecimento
routes.use("/areas-conhecimento", areaConhecimentoRoutes);

// Exporta as rotas
export default routes;