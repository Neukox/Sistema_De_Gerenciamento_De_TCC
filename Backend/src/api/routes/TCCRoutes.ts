import Router from "express";
import createTCCController from "../controllers/TCC/createController";
import authorization from "../middlewares/authorization";
import allowRoles from "../middlewares/allowRoles";

const TCCRoutes = Router();

// Rota para criar um novo TCC
TCCRoutes.post(
  "/",
  [authorization, allowRoles(["ALUNO"])],
  createTCCController
);

// Exporta as rotas
export default TCCRoutes;
