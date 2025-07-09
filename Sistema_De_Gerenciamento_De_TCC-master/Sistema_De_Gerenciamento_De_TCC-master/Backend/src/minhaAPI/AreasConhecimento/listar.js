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
exports.listarAreasConhecimento = listarAreasConhecimento;
exports.buscarAreaPorId = buscarAreaPorId;
const prisma_1 = __importDefault(require("../../../prisma/PrismaClient/prisma"));
/**
 * Lista todas as áreas de conhecimento disponíveis
 * @param req Request
 * @param res Response
 */
function listarAreasConhecimento(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Buscar todas as áreas de conhecimento ordenadas por código
            const areas = yield prisma_1.default.areaConhecimento.findMany({
                select: {
                    id: true,
                    codigo: true,
                    nome: true,
                    nivel: true
                },
                orderBy: [
                    { nivel: 'asc' },
                    { codigo: 'asc' }
                ]
            });
            // Verificar se encontrou áreas
            if (areas.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Nenhuma área de conhecimento encontrada',
                    data: []
                });
                return;
            }
            // Retornar as áreas encontradas
            res.status(200).json({
                success: true,
                message: `${areas.length} áreas de conhecimento encontradas`,
                data: areas
            });
        }
        catch (error) {
            console.error('Erro ao buscar áreas de conhecimento:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor ao buscar áreas de conhecimento',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
/**
 * Busca uma área de conhecimento específica por ID
 * @param req Request
 * @param res Response
 */
function buscarAreaPorId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // Validar se o ID é um número
            const areaId = parseInt(id);
            if (isNaN(areaId)) {
                res.status(400).json({
                    success: false,
                    message: 'ID da área de conhecimento deve ser um número válido'
                });
                return;
            }
            // Buscar a área específica
            const area = yield prisma_1.default.areaConhecimento.findUnique({
                where: {
                    id: areaId
                },
                select: {
                    id: true,
                    codigo: true,
                    nome: true,
                    nivel: true,
                    _count: {
                        select: {
                            tccs: true // Contar quantos TCCs estão nesta área
                        }
                    }
                }
            });
            if (!area) {
                res.status(404).json({
                    success: false,
                    message: 'Área de conhecimento não encontrada'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Área de conhecimento encontrada',
                data: {
                    id: area.id,
                    codigo: area.codigo,
                    nome: area.nome,
                    nivel: area.nivel,
                    quantidadeTccs: area._count.tccs
                }
            });
        }
        catch (error) {
            console.error('Erro ao buscar área de conhecimento:', error);
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor ao buscar área de conhecimento',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    });
}
