"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autorizacao_1 = require("../../Middlewares/JWT/autorizacao");
// Middleware para verificar se o usuário é admin
const verificarAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({
            message: 'Acesso negado. Apenas administradores podem acessar esta área.',
            success: false
        });
    }
};
const routesPrivate = (0, express_1.Router)();
// Rota protegida para página principal - teste de autorização
routesPrivate.get('/home', autorizacao_1.autorizacao, (req, res) => {
    // Aqui você pode acessar todas as informações do token
    const { id, email, role, tipo } = req.user;
    res.status(200).json({
        message: `Bem-vindo à página principal, ${tipo}!`,
        success: true,
        usuario: {
            id,
            email,
            role,
            tipo
        },
        timestamp: new Date().toISOString(),
        permissoes: {
            isAdmin: role === 'admin',
            isUser: role === 'user',
            tipo: tipo
        }
    });
});
// Rota protegida apenas para admins - teste adicional
routesPrivate.get('/admin', autorizacao_1.autorizacao, verificarAdmin, (req, res) => {
    res.status(200).json({
        message: 'Área administrativa - Acesso restrito para administradores',
        success: true,
        usuario: req.user,
        timestamp: new Date().toISOString()
    });
});
// Rota para perfil do usuário - qualquer usuário autenticado
routesPrivate.get('/perfil', autorizacao_1.autorizacao, (req, res) => {
    const { id, email, role, tipo } = req.user;
    res.status(200).json({
        message: 'Dados do perfil do usuário',
        success: true,
        usuario: {
            id,
            email,
            role,
            tipo
        }
    });
});
exports.default = routesPrivate;
