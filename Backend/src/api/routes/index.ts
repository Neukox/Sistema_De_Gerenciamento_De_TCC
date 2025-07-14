import { Router } from "express";
import authRoutes from "./authRoutes";
<<<<<<< HEAD
<<<<<<< HEAD
import alunosRoutes from "./alunosRoutes";
import professorRoutes from "./professorRoutes";
<<<<<<< HEAD
<<<<<<< HEAD
import TCCRoutes from "./TCCRoutes";
import areaConhecimentoRoutes from "./areaConhecimentoRoutes";
<<<<<<< HEAD
<<<<<<< HEAD
import atividadesRoutes from "./atividadesRoutes";
import anotacaoRoutes from "./anotacaoRoutes";
<<<<<<< HEAD
<<<<<<< HEAD
import progressRoutes from "./progressRoutes";
import reunioesRoutes from "./reunioesRoutes";
=======
>>>>>>> 6bcdba5 (Adicionando rotas de autenticação e centralizando as rotas da API)
=======
import alunosRoutes from "./alunosRoutes";
>>>>>>> ca23945 (Adicionando controlador para buscar todos os alunos e configurando rotas para gerenciamento de alunos)
=======
>>>>>>> aecce26 (Adicionando rotas para gerenciamento de professores)
=======
import TCCRoutes from "./TCCRoutes";
>>>>>>> 89cd345 (Adiciona rotas para TCCs)
=======
>>>>>>> bb3c03f (Implementando serviços e rotas para gerenciamento de áreas de conhecimento)
=======
import atividadesRoutes from "./atividadesRoutes";
>>>>>>> fbd8ab1 (adiciona rotas, controlador, serviço e repositório para criação de atividades)
=======
>>>>>>> 6306014 (adiciona rotas para gerenciamento de anotações)
=======
import progressRoutes from "./progressRoutes";
>>>>>>> de35db7 (Enviando algoritmo de calculo de progresso de desenvolvimento de TCC.)

// Arquivo de centralização das rotas da API
// Este arquivo importa e agrupa todas as rotas da API.

const routes = Router();

// Usando as rotas de autenticação
<<<<<<< HEAD
<<<<<<< HEAD
routes.use("/auth", authRoutes);
// Usando as rotas de alunos
routes.use("/alunos", alunosRoutes);
// Usando as rotas de professores
routes.use("/professores", professorRoutes);
// Usando as rotas de TCC
routes.use("/tccs", TCCRoutes);
// Usando as rotas de áreas de conhecimento
routes.use("/areas-conhecimento", areaConhecimentoRoutes);
// Usando as rotas de atividades
routes.use("/atividades", atividadesRoutes);
<<<<<<< HEAD
<<<<<<< HEAD
// Usando as rotas de anotações
routes.use("/anotacoes", anotacaoRoutes);
// Usando as rotas de progresso
routes.use("/progress", progressRoutes);
<<<<<<< HEAD
// Usando as rotas de reuniões
routes.use("/reunioes", reunioesRoutes);
=======
// Usando as rotas de anotações
routes.use("/anotacoes", anotacaoRoutes);
>>>>>>> 6306014 (adiciona rotas para gerenciamento de anotações)
=======
>>>>>>> de35db7 (Enviando algoritmo de calculo de progresso de desenvolvimento de TCC.)

// Exporta as rotas
export default routes;
routes.use("/", authRoutes);
=======
routes.use("/auth", authRoutes);
>>>>>>> 6d1d8f0 (Enviando atualização sobre ligação com front end e back end.)
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
>>>>>>> 6bcdba5 (Adicionando rotas de autenticação e centralizando as rotas da API)
=======

// Exporta as rotas
export default routes;
>>>>>>> fbd8ab1 (adiciona rotas, controlador, serviço e repositório para criação de atividades)
