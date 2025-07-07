"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = Login;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../../prisma/PrismaClient/prisma"));
const config_1 = require("../ConfigJwt/config");
function Login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Validação dos campos obrigatórios
            if (!email || !password) {
                res.status(400).json({
                    message: 'Todos os campos são obrigatórios.',
                    success: false
                });
                return;
            }
            // Validação básica do formato do email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({
                    message: 'Formato de email inválido.',
                    success: false
                });
                return;
            }
            // Busca o usuário no banco de dados
            const usuario = yield prisma_1.default.usuario.findUnique({
                where: { email: email.toLowerCase() },
            });
            if (!usuario) {
                res.status(401).json({
                    message: 'Credenciais inválidas.',
                    success: false
                });
                return;
            }
            // Verifica a senha
            const senhaCorreta = yield bcryptjs_1.default.compare(password, usuario.senha);
            if (!senhaCorreta) {
                res.status(401).json({
                    message: 'Credenciais inválidas.',
                    success: false
                });
                return;
            }
            // Obtém a configuração JWT
            const jwtConfig = (0, config_1.getJwtConfig)();
            // Geração do token JWT
            const payload = {
                id: usuario.id,
                role: usuario.role,
                tipo: usuario.tipo,
                email: usuario.email,
            };
            const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
            // Resposta de sucesso
            res.status(200).json({
                message: 'Login realizado com sucesso.',
                success: true,
                token,
                usuario: {
                    id: usuario.id,
                    nomeCompleto: usuario.nomeCompleto,
                    email: usuario.email,
                    tipo: usuario.tipo,
                    role: usuario.role,
                },
            });
        }
        catch (error) {
            console.error('Erro no processo de login:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false
            });
        }
    });
}
