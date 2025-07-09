"use strict";
//Algoritmo de cadastro de TCC
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
exports.cadastrarTCC = cadastrarTCC;
const prisma_1 = __importDefault(require("../../../prisma/PrismaClient/prisma"));
const client_1 = require("@prisma/client");
function cadastrarTCC(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Desestruturando os dados do corpo da requisição.
            const { titulo, tema, curso, orientador, coorientador, resumo, statusAtual } = req.body;
            //Verificando se todos os campos obrigatórios foram preenchidos.
            if (!titulo || !tema || !curso || !resumo || !statusAtual) {
                res.status(400).json({
                    message: 'Os campos titulo, tema, curso, resumo e statusAtual são obrigatórios.',
                    success: false
                });
                return;
            }
            // Verificar se o status é válido
            const statusValidos = Object.values(client_1.StatusTCC);
            if (!statusValidos.includes(statusAtual)) {
                res.status(400).json({
                    message: `Status inválido. Status válidos: ${statusValidos.join(', ')}`,
                    success: false
                });
                return;
            }
            // Buscar o aluno logado pelo email do token JWT
            if (!req.user) {
                res.status(401).json({
                    message: 'Usuário não autenticado.',
                    success: false
                });
                return;
            }
            const aluno = yield prisma_1.default.aluno.findFirst({
                where: {
                    usuario: {
                        email: req.user.email
                    }
                },
                include: {
                    usuario: true
                }
            });
            if (!aluno) {
                res.status(404).json({
                    message: 'Aluno não encontrado.',
                    success: false
                });
                return;
            }
            // Verificar se o aluno já possui um TCC
            const tccExistente = yield prisma_1.default.tCC.findUnique({
                where: { alunoId: aluno.id }
            });
            if (tccExistente) {
                res.status(400).json({
                    message: 'Você já possui um TCC cadastrado.',
                    success: false
                });
                return;
            }
            // Buscar orientador pelo nome (se fornecido)
            let orientadorId = null;
            if (orientador && orientador.trim()) {
                // Por enquanto, aceita qualquer nome sem buscar no banco
                console.log(`Orientador informado: ${orientador}`);
            }
            // Buscar coorientador pelo nome (se fornecido)
            let coorientadorId = null;
            if (coorientador && coorientador.trim()) {
                // Por enquanto, aceita qualquer nome sem buscar no banco
                console.log(`Coorientador informado: ${coorientador}`);
            }
            // Atualizar o curso do aluno
            yield prisma_1.default.aluno.update({
                where: { id: aluno.id },
                data: { curso: curso.trim() }
            });
            //Se todos os campos foram validados, os dados serão salvos no banco de dados.
            const tccSalvo = yield prisma_1.default.tCC.create({
                data: {
                    titulo,
                    tema,
                    resumo,
                    status_atual: statusAtual,
                    alunoId: aluno.id,
                    orientadorId,
                    coorientadorId
                },
                include: {
                    aluno: {
                        include: {
                            usuario: {
                                select: {
                                    nomeCompleto: true,
                                    email: true
                                }
                            }
                        }
                    },
                    orientador: {
                        include: {
                            usuario: {
                                select: {
                                    nomeCompleto: true,
                                    email: true
                                }
                            }
                        }
                    },
                    coorientador: {
                        include: {
                            usuario: {
                                select: {
                                    nomeCompleto: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });
            //Tudo ocorrendo bem, retorna uma resposta de sucesso.
            res.status(201).json({
                message: 'TCC cadastrado com sucesso.',
                success: true,
                tcc: tccSalvo
            });
        }
        catch (error) {
            //Se ocorrer algum erro no servidor, retorna uma resposta de erro.
            console.error('Erro ao cadastrar TCC:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
