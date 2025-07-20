import { Router } from "express";
import loginController from "../controllers/auth/loginController";
import registerController from "../controllers/auth/registerController";

import { requestPasswordResetController } from "../controllers/auth/passwordRecuperationController";
import { resetPasswordController } from "../controllers/auth/resetPasswordController";
import updateNomeController from "../controllers/alterar-nome/updatenome";
import updatePasswordController from "../controllers/alterar-senha/updatepassword";
import authorization from "../middlewares/authorization";

// Arquivo de rotas de autenticação
// Este arquivo define as rotas relacionadas à autenticação, como login.

const authRoutes = Router();

// Rota de login
authRoutes.post("/login", loginController);

// Rota de registro
authRoutes.post("/register", registerController);

// Rota de recuperação de senha
authRoutes.post("/request-password-reset", requestPasswordResetController);

// Rota de redefinição de senha
authRoutes.post("/reset-password", resetPasswordController);

// Rotas protegidas (requerem autenticação)
// Rota para alterar nome
authRoutes.put("/alterar-nome", authorization, updateNomeController);

// Rota para alterar senha
authRoutes.put("/alterar-senha", authorization, updatePasswordController);

// Exporta as rotas de autenticação
export default authRoutes;