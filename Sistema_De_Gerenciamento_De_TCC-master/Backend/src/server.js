"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./minhaAPI/Routes/routes")); // ajuste o caminho se necessário
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Configurar CORS para permitir requisições do frontend
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // URL do Vite em desenvolvimento
    credentials: true
}));
// Middleware para entender JSON
app.use(express_1.default.json());
// Usar rotas externas
app.use(routes_1.default);
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
