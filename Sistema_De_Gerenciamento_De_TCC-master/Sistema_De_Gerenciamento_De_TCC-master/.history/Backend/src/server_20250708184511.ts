import express from 'express';
import cors from 'cors';
import routes from './minhaAPI/Routes/routes'; // ajuste o caminho se necessário

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL do Vite em desenvolvimento
  credentials: true
}));

// Middleware para entender JSON
app.use(express.json());

// Usar rotas externas
app.use(routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
