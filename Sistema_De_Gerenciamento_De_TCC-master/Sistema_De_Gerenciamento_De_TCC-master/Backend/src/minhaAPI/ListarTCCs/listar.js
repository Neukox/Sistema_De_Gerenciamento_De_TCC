"use strict";
//Algoritmo para listar TCCs
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
exports.listarTCCs = listarTCCs;
exports.buscarTCCPorId = buscarTCCPorId;
const prisma_1 = __importDefault(require("../../../prisma/PrismaClient/prisma"));
function listarTCCs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tccs = yield prisma_1.default.tCC.findMany({
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
                },
                orderBy: {
                    criado_em: 'desc'
                }
            });
            res.status(200).json({
                message: 'TCCs listados com sucesso.',
                success: true,
                tccs,
                total: tccs.length
            });
        }
        catch (error) {
            console.error('Erro ao listar TCCs:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
function buscarTCCPorId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id || isNaN(parseInt(id))) {
                res.status(400).json({
                    message: 'ID do TCC inválido.',
                    success: false
                });
                return;
            }
            const tcc = yield prisma_1.default.tCC.findUnique({
                where: { id: parseInt(id) },
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
                    },
                    comentarios: {
                        orderBy: {
                            data_criacao: 'desc'
                        }
                    },
                    atividades: {
                        orderBy: {
                            data_entrega: 'asc'
                        }
                    }
                }
            });
            if (!tcc) {
                res.status(404).json({
                    message: 'TCC não encontrado.',
                    success: false
                });
                return;
            }
            res.status(200).json({
                message: 'TCC encontrado.',
                success: true,
                tcc
            });
        }
        catch (error) {
            console.error('Erro ao buscar TCC:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
