import Router from "express";
import createTCCController from "../controllers/TCC/createController";
import authorization from "../middlewares/authorization";
import allowRoles from "../middlewares/allowRoles";
import getTccByIdController from "../controllers/TCC/getByIdController";
import getAllController from "../controllers/TCC/getAllController";

const TCCRoutes = Router();

// Rota para obter todos os TCCs
TCCRoutes.get("/", [authorization], getAllController);

// Rota para obter um TCC específico
TCCRoutes.get("/:id", [authorization], getTccByIdController);

// Rota para criar um novo TCC
TCCRoutes.post(
  "/",
  [authorization, allowRoles(["ALUNO"])],
  createTCCController
);

// Exporta as rotas
export default TCCRoutes;
