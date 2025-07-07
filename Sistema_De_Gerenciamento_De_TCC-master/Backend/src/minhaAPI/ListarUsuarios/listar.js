"use strict";
//Algoritmo para listar alunos e professores disponíveis
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
exports.listarAlunos = listarAlunos;
exports.listarProfessores = listarProfessores;
exports.listarProfessoresDisponiveis = listarProfessoresDisponiveis;
const prisma_1 = __importDefault(require("../../../prisma/PrismaClient/prisma"));
function listarAlunos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const alunos = yield prisma_1.default.aluno.findMany({
                include: {
                    usuario: {
                        select: {
                            nomeCompleto: true,
                            email: true
                        }
                    },
                    tcc: {
                        select: {
                            id: true,
                            titulo: true
                        }
                    }
                },
                orderBy: {
                    usuario: {
                        nomeCompleto: 'asc'
                    }
                }
            });
            res.status(200).json({
                message: 'Alunos listados com sucesso.',
                success: true,
                alunos,
                total: alunos.length
            });
        }
        catch (error) {
            console.error('Erro ao listar alunos:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
function listarProfessores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const professores = yield prisma_1.default.professor.findMany({
                include: {
                    usuario: {
                        select: {
                            nomeCompleto: true,
                            email: true
                        }
                    },
                    orientacoes: {
                        select: {
                            id: true,
                            titulo: true
                        }
                    },
                    coorientacoes: {
                        select: {
                            id: true,
                            titulo: true
                        }
                    }
                },
                orderBy: {
                    usuario: {
                        nomeCompleto: 'asc'
                    }
                }
            });
            res.status(200).json({
                message: 'Professores listados com sucesso.',
                success: true,
                professores,
                total: professores.length
            });
        }
        catch (error) {
            console.error('Erro ao listar professores:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
function listarProfessoresDisponiveis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const professores = yield prisma_1.default.professor.findMany({
                where: {
                    disponibilidade: true
                },
                include: {
                    usuario: {
                        select: {
                            nomeCompleto: true,
                            email: true
                        }
                    },
                    orientacoes: {
                        select: {
                            id: true,
                            titulo: true
                        }
                    },
                    coorientacoes: {
                        select: {
                            id: true,
                            titulo: true
                        }
                    }
                },
                orderBy: {
                    usuario: {
                        nomeCompleto: 'asc'
                    }
                }
            });
            res.status(200).json({
                message: 'Professores disponíveis listados com sucesso.',
                success: true,
                professores,
                total: professores.length
            });
        }
        catch (error) {
            console.error('Erro ao listar professores disponíveis:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
