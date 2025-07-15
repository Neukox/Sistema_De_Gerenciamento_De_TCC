import { Router } from "express";
import { 
    calculateTCCProgressController,
    getOrientadorTCCsProgressController 
} from "../controllers/progress-desenvolvimento-tcc/progress";
import { authorization } from "../middlewares/authorization";
import { allowRoles } from "../middlewares/allowRoles";

const router = Router();

/**
 * @route GET /progress/tcc/:tccId
 * @desc Calcular o progresso de um TCC específico baseado nos 5 pilares
 * @access Professores e Alunos autenticados
 */
router.get(
    "/tcc/:tccId", 
    authorization,
    allowRoles(["PROFESSOR", "ALUNO"]),
    calculateTCCProgressController
);

/**
 * @route GET /progress/orientador/:orientadorId
 * @desc Obter progresso de todos os TCCs de um orientador
 * @access Apenas Professores
 */
router.get(
    "/orientador/:orientadorId", 
    authorization,
    allowRoles(["PROFESSOR"]),
    getOrientadorTCCsProgressController
);

export default router;
