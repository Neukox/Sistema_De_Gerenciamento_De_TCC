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
        const { nomeCompleto, instituicao, email, confirmEmail, senha, confirmSenha } = req.body;
        //Verificando se todos os campos foram preenchidos
        if (!nomeCompleto || !instituicao || !email || !confirmEmail || !senha || !confirmSenha) {
            res.status(400).json({
                message: 'Por favor, preencha todos os campos obrigatórios para continuar.',
                success: false
            });
            return;
        }
        // Validação se os emails coincidem
        if (email !== confirmEmail) {
            res.status(400).json({
                message: 'Os emails informados não coincidem. Verifique e tente novamente.',
                success: false
            });
            return;
        }
        // Validação se as senhas coincidem
        if (senha !== confirmSenha) {
            res.status(400).json({
                message: 'As senhas informadas não coincidem. Verifique e tente novamente.',
                success: false
            });
            return;
        }
        // Validação básica do formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({
                message: 'Por favor, informe um email válido.',
                success: false
            });
            return;
        }
        // Validação do tamanho da senha
        if (senha.length < 6) {
            res.status(400).json({
                message: 'A senha deve ter pelo menos 6 caracteres.',
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
                    message: 'Este email já está sendo usado. Tente fazer login ou use outro email.',
                    success: false
                });
                return;
            }
            //Criptografando a senha
            const senhaCriptografada = yield bcryptjs_1.default.hash(senha, 10);
            // Criando usuario no banco de dados.
            const usuario = yield prisma_1.default.usuario.create({
                data: {
                    nomeCompleto: nomeCompleto.trim(),
                    email: email.toLowerCase(),
                    senha: senhaCriptografada,
                    tipo: 'aluno', // Por padrão, todos são alunos
                    role: 'user' // Definindo o role como 'user' por padrão
                }
            });
            // Criar registro de aluno automaticamente
            yield prisma_1.default.aluno.create({
                data: {
                    id: usuario.id,
                    curso: '', // Campo vazio por enquanto, será preenchido no cadastro do TCC
                    instituicao: instituicao.trim()
                }
            });
            //Retornando usuario criado.
            res.status(201).json({
                message: 'Conta criada com sucesso! Você será redirecionado para fazer login.',
                success: true,
                usuario: {
                    id: usuario.id,
                    nomeCompleto: usuario.nomeCompleto,
                    email: usuario.email,
                    instituicao,
                    tipo: usuario.tipo,
                    role: usuario.role
                }
            });
        }
        catch (error) {
            //Se acontecer algum erro, retorna o erro.
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({
                message: 'Ops! Algo deu errado. Tente novamente em alguns minutos.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
