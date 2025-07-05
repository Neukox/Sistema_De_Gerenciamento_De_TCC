"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarAdmin = verificarAdmin;
// Middleware para verificar se o usuário é admin
function verificarAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({
            message: 'Acesso negado. Apenas administradores podem acessar esta área.',
            success: false
        });
    }
}
