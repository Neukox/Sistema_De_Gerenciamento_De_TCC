import { Response } from "express";
import { RequestWithUser } from "../../types/auth";
import { prisma } from "../../config/prisma";

/**
 * Controller para alterar o nome completo do usuário
 * @param req - Requisição com dados do usuário autenticado
 * @param res - Resposta da requisição
 */
export const updateNomeController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    console.log('=== ALTERAR NOME ===');
    console.log('User ID:', req.user?.id);
    console.log('Body:', req.body);

    const { nome_completo } = req.body;
    const userId = req.user?.id;

    // Validações
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
      return;
    }

    if (!nome_completo || typeof nome_completo !== 'string') {
      res.status(400).json({
        success: false,
        message: "Nome completo é obrigatório e deve ser uma string."
      });
      return;
    }

    // Validar se o nome não está vazio após trim
    const nomeFormatado = nome_completo.trim();
    if (nomeFormatado.length === 0) {
      res.status(400).json({
        success: false,
        message: "Nome completo não pode estar vazio."
      });
      return;
    }

    // Validar tamanho mínimo e máximo
    if (nomeFormatado.length < 2) {
      res.status(400).json({
        success: false,
        message: "Nome completo deve ter pelo menos 2 caracteres."
      });
      return;
    }

    if (nomeFormatado.length > 100) {
      res.status(400).json({
        success: false,
        message: "Nome completo deve ter no máximo 100 caracteres."
      });
      return;
    }

    // Verificar se o usuário existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: userId }
    });

    if (!usuarioExistente) {
      res.status(404).json({
        success: false,
        message: "Usuário não encontrado."
      });
      return;
    }

    // Atualizar o nome do usuário
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: userId },
      data: { 
        nome_completo: nomeFormatado,
        atualizado_em: new Date()
      },
      select: {
        id: true,
        nome_completo: true,
        email: true,
        tipo: true,
        atualizado_em: true
      }
    });

    console.log('Nome atualizado com sucesso:', usuarioAtualizado);

    res.status(200).json({
      success: true,
      message: "Nome alterado com sucesso!",
      usuario: usuarioAtualizado
    });

  } catch (error) {
    console.error("Erro ao alterar nome:", error);
    
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao alterar nome."
    });
  }
};

export default updateNomeController;
