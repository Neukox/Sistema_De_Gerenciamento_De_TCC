"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autorizacao_1 = require("../../Middlewares/JWT/autorizacao");
const cadastrar_1 = require("../../CadastrarTCC/cadastrar");
const listar_1 = require("../../ListarTCCs/listar");
const listar_2 = require("../../ListarUsuarios/listar");
const buscar_1 = require("../../BuscarProfessores/buscar");
const routesPrivate = (0, express_1.Router)();
// Middleware de autorização - aplicado a todas as rotas privadas
routesPrivate.use(autorizacao_1.autorizacao);
// Rota de teste para usuários autenticados
routesPrivate.get('/', (req, res) => {
    res.json({
        message: 'Acesso autorizado!',
        success: true,
        user: req.user
    });
});
// Rota para listar dados do usuário logado
routesPrivate.get('/me', (req, res) => {
    if (!req.user) {
        res.status(401).json({
            message: 'Usuário não autenticado.',
            success: false
        });
        return;
    }
    res.json({
        message: 'Dados do usuário.',
        success: true,
        user: req.user
    });
});
// Rota para cadastrar TCC - qualquer usuário autenticado pode cadastrar
routesPrivate.post('/cadastrar-tcc', cadastrar_1.cadastrarTCC);
// Rotas para listar TCCs
routesPrivate.get('/tccs', listar_1.listarTCCs);
routesPrivate.get('/tccs/:id', listar_1.buscarTCCPorId);
// Rotas para listar usuários (úteis para formulários)
routesPrivate.get('/alunos', listar_2.listarAlunos);
routesPrivate.get('/professores', listar_2.listarProfessores);
routesPrivate.get('/professores/disponiveis', listar_2.listarProfessoresDisponiveis);
routesPrivate.get('/professores/buscar', buscar_1.buscarProfessoresPorNome);
exports.default = routesPrivate;
