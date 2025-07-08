import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import prisma from '../../../prisma/PrismaClient/prisma';
import { getJwtConfig } from '../ConfigJwt/config';

export async function Login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, senha, password } = req.body;
    
    // Aceitar tanto senha quanto password para compatibilidade
    const senhaParaVerificar = senha || password;

    // Validação dos campos obrigatórios
    if (!email || !senhaParaVerificar) {
      res.status(400).json({ 
        message: 'Os campos email e senha são obrigatórios.',
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

    // Buscar usuário por email
    const usuario = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!usuario) {
      res.status(401).json({ 
        message: 'Credenciais inválidas.',
        success: false 
      });
      return;
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senhaParaVerificar, usuario.senha);
    if (!senhaValida) {
      res.status(401).json({ 
        message: 'Credenciais inválidas.',
        success: false 
      });
      return;
    }

    // Configuração do JWT
    const { secret, expiresIn } = getJwtConfig();

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email, 
        tipo: usuario.tipo,
        role: usuario.role 
      },
      secret,
      { expiresIn }
    );

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
        role: usuario.role
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      message: 'Erro interno do servidor.',
      success: false,
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
