"use strict";
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
exports.Registro = Registro;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../../../prisma/PrismaClient/prisma"));
function Registro(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nomeCompleto, email, password } = req.body;
        //Verificando se todos os campos foram preenchidos
        if (!nomeCompleto || !email || !password) {
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
        try {
            //Se o email for preenchido, verificar se já existe no banco de dados.
            const usuarioExistente = yield prisma_1.default.usuario.findUnique({
                where: {
                    email: email.toLowerCase()
                }
            });
            //Validando se já existe no banco.
            if (usuarioExistente) {
                res.status(400).json({
                    message: 'Usuário já existe, informe um email diferente.',
                    success: false
                });
                return;
            }
            //Criptografando a senha
            const senhaCriptografada = yield bcryptjs_1.default.hash(password, 10);
            //Criando usuario no banco de dados.
            const usuario = yield prisma_1.default.usuario.create({
                data: {
                    nomeCompleto: nomeCompleto,
                    email: email.toLowerCase(),
                    senha: senhaCriptografada,
                    tipo: 'usuario', // Definindo o tipo como 'usuario' por padrão
                    role: 'user' // Definindo o role como 'user' por padrão
                }
            });
            //Retornando usuario criado.
            res.status(201).json({
                message: 'Usuário criado com sucesso.',
                success: true,
                usuario: {
                    id: usuario.id,
                    nomeCompleto: usuario.nomeCompleto,
                    email: usuario.email,
                    tipo: usuario.tipo,
                    role: usuario.role
                }
            });
        }
        catch (error) {
            //Se acontecer algum erro, retorna o erro.
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false
            });
        }
    });
}
