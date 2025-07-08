import express from 'express';
import routes from './minhaAPI/Routes/routes'; // ajuste o caminho se necessário

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON
app.use(express.json());

// Usar rotas externas
app.use(routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
