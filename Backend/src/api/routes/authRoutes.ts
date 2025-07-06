import { Router } from "express";
import loginController from "../controllers/auth/loginController";
import registerController from "../controllers/auth/registerController";

// Arquivo de rotas de autenticação
// Este arquivo define as rotas relacionadas à autenticação, como login.

const authRoutes = Router();

// Rota de login
authRoutes.post("/login", loginController);

// Rota de registro
authRoutes.post("/register", registerController);

// Exporta as rotas de autenticação
export default authRoutes;