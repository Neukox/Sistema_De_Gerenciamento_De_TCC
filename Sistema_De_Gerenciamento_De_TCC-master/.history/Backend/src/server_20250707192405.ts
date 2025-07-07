import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './minhaAPI/Routes/routes'; // ajuste o caminho se necessário

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para entender JSON
app.use(express.json());

// Usar rotas externas
app.use(routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
