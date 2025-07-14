import Router from "express";
import createAtividadeController from "../controllers/atividades/createController";
import allowRoles from "../middlewares/allowRoles";
import authorization from "../middlewares/authorization";
import updateAtividadeController from "../controllers/atividades/updateController";
import validateNumberParams from "../middlewares/validateNumberParams";
import getByTccController from "../controllers/atividades/getByTccController";

// Rotas para atividades

const atividadesRouter = Router();

// Rota para buscar todas as atividades de um TCC específico
atividadesRouter.get(
  "/tcc/:id",
  [authorization, allowRoles(["ALUNO", "ADMIN"]), validateNumberParams],
  getByTccController
);

// Rota para criar uma nova atividade
atividadesRouter.post(
  "/",
  [authorization, allowRoles(["ALUNO", "ADMIN"])],
  createAtividadeController
);

// Rota para atualizar uma atividade existente
atividadesRouter.put(
  "/:id",
  [authorization, allowRoles(["ALUNO", "ADMIN"]), validateNumberParams],
  updateAtividadeController
);

// Exportando o router
export default atividadesRouter;
