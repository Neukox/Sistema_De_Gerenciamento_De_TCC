import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import prisma from '../../../prisma/PrismaClient/prisma';
import { getJwtConfig } from '../ConfigJwt/config';

export async function Login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    // Validação dos campos obrigatórios
    if (!email || !password) {
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

    // Busca o usuário no banco de dados
    const usuario = await prisma.usuario.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!usuario) {
      res.status(401).json({ 
        message: 'Credenciais inválidas.',
        success: false 
      });
      return;
    }

    // Verifica a senha
<<<<<<< HEAD
    const senhaCorreta = await bcrypt.compare(password, usuario.senha);
=======
    const senhaCorreta = await bcrypt.compare(senhaParaVerificar, usuario.senha);
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c
    if (!senhaCorreta) {
      res.status(401).json({ 
        message: 'Credenciais inválidas.',
        success: false 
      });
      return;
    }

    // Obtém a configuração JWT
    const jwtConfig = getJwtConfig();

    // Geração do token JWT
    const payload = {
      id: usuario.id,
      role: usuario.role,
      tipo: usuario.tipo,
      email: usuario.email,
    };
    
    const token = jwt.sign(
      payload,
      jwtConfig.secret as string,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Resposta de sucesso
    res.status(200).json({
      message: 'Login realizado com sucesso.',
      success: true,
      token,
      usuario: {
        id: usuario.id,
<<<<<<< HEAD
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
=======
        nomeCompleto: usuario.nomeCompleto,
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c
        email: usuario.email,
        tipo: usuario.tipo,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error('Erro no processo de login:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor.',
      success: false 
    });
  }
}