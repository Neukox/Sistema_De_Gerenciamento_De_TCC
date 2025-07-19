import { Response } from "express";
import { RequestWithUser } from "../../types/auth";
import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";

/**
 * Controller para alterar a senha do usuário
 * @param req - Requisição com dados do usuário autenticado
 * @param res - Resposta da requisição
 */
export const updatePasswordController = async (
  req: RequestWithUser,
  res: Response
): Promise<void> => {
  try {
    console.log('=== ALTERAR SENHA ===');
    console.log('User ID:', req.user?.id);

    const { nova_senha } = req.body;
    const userId = req.user?.id;

    // Validações
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Usuário não autenticado."
      });
      return;
    }

    if (!nova_senha || typeof nova_senha !== 'string') {
      res.status(400).json({
        success: false,
        message: "Nova senha é obrigatória."
      });
      return;
    }

    // Validar tamanho da senha
    if (nova_senha.length < 6) {
      res.status(400).json({
        success: false,
        message: "A senha deve ter pelo menos 6 caracteres."
      });
      return;
    }

    if (nova_senha.length > 50) {
      res.status(400).json({
        success: false,
        message: "A senha deve ter no máximo 50 caracteres."
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

    // Criptografar a nova senha
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(nova_senha, saltRounds);

    // Atualizar a senha do usuário
    await prisma.usuario.update({
      where: { id: userId },
      data: { 
        senha: senhaCriptografada,
        atualizado_em: new Date()
      }
    });

    console.log('Senha atualizada com sucesso para usuário:', userId);

    res.status(200).json({
      success: true,
      message: "Senha alterada com sucesso!"
    });

  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor ao alterar senha."
    });
  }
};

export default updatePasswordController;
