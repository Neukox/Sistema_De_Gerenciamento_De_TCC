import { Router } from "express";
import authRoutes from "./authRoutes";
import alunosRoutes from "./alunosRoutes";

// Arquivo de centralização das rotas da API
// Este arquivo importa e agrupa todas as rotas da API.

const routes = Router();

// Usando as rotas de autenticação
routes.use("/", authRoutes);
// Usando as rotas de alunos
routes.use("/alunos", alunosRoutes);

// Exporta as rotas
export default routes;