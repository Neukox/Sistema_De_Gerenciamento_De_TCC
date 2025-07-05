"use strict";
//Algoritmo para buscar professores por nome
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
exports.buscarProfessoresPorNome = buscarProfessoresPorNome;
const prisma_1 = __importDefault(require("../../../prisma/PrismaClient/prisma"));
function buscarProfessoresPorNome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome } = req.query;
            if (!nome || typeof nome !== 'string') {
                res.status(400).json({
                    message: 'Parâmetro "nome" é obrigatório.',
                    success: false
                });
                return;
            }
            const professores = yield prisma_1.default.professor.findMany({
                where: {
                    disponibilidade: true,
                    usuario: {
                        nomeCompleto: {
                            contains: nome,
                            mode: 'insensitive'
                        }
                    }
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
                message: `${professores.length} professor(es) encontrado(s).`,
                success: true,
                professores: professores.map(prof => ({
                    id: prof.id,
                    nomeCompleto: prof.usuario.nomeCompleto,
                    email: prof.usuario.email,
                    area_atuacao: prof.area_atuacao,
                    totalOrientacoes: prof.orientacoes.length,
                    totalCoorientacoes: prof.coorientacoes.length
                }))
            });
        }
        catch (error) {
            console.error('Erro ao buscar professores:', error);
            res.status(500).json({
                message: 'Erro interno do servidor.',
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
