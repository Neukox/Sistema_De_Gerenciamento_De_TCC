import Router from "express";
import createAtividadeController from "../controllers/atividades/createController";
import allowRoles from "../middlewares/allowRoles";
import authorization from "../middlewares/authorization";

// Rotas para atividades

const atividadesRouter = Router();

// Rota para criar uma nova atividade
atividadesRouter.post(
  "/",
  [authorization, allowRoles(["ALUNO", "ADMIN"])],
  createAtividadeController
);

// Exportando o router
export default atividadesRouter;
