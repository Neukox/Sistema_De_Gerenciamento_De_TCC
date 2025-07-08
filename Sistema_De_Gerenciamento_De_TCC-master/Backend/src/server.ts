import express from 'express';
import routes from './minhaAPI/Routes/routes'; // ajuste o caminho se necessário
import express from "express";
import routes from "./api/routes/";
import { errorHandler } from "./api/middlewares/errorHandler";
// import routes from "./minhaAPI/Routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON
app.use(express.json());

// Usar rotas externas
app.use(routes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
