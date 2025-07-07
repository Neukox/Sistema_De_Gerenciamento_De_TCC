"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registro_1 = require("../../Registro/registro");
const login_1 = require("../../Login/login");
const routesPublic = (0, express_1.Router)();
// Rota de teste (opcional)
routesPublic.get('/', (req, res) => {
    res.send('API de Autenticação funcionando!');
});
// Rota de registro
routesPublic.post('/register', registro_1.Registro);
// Rota de login - qualquer usuário pode fazer login
routesPublic.post('/login', login_1.Login);
exports.default = routesPublic;
