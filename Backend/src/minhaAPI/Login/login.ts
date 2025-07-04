//Algoritmo de login

import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../../prisma/PrismaClient/prisma';

export async function Login(req: Request, res: Response, next: NextFunction) {
    //Desestruturando os dados do corpo da requisição.
    const {email, password} = req.body;

    //Verificando todos se todos os campos foram preenchidos.
    if (!email || !password) {
        res.status(400).json({message: 'Todos os campos são obrigatórios.'});
        return;
    }

    //Verificando se o email existe no banco de dados.
    const emailExistente = await prisma.usuario.findMany({
        where: {
            email: email
        }
    });

    //Se email nao existir, retorna erro.
    if (emailExistente.length === 0) {
        res.status(400).json({message: 'Email não encontrado.'});
        return;
    }

    //Verificando se a senha está correta.
    const usuario = emailExistente[0];
    const senhaCorreta = await bcrypt.compare(password, usuario.senha);

    //Se a senha estiver incorreta, retorna erro.
    if (!senhaCorreta) {
        res.status(400).json({message: 'Senha incorreta.'});
        return;
    }

    //Estando tudo certo, retorna usuario logado.
    res.status(200).json({
        message: 'Usuário logado com sucesso.',
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            email: usuario.email,
            tipo: usuario.tipo,
            role: usuario.role
        }
    });
}