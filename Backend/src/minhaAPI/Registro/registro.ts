import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../../prisma/PrismaClient/prisma';


export async function  Registro(req: Request, res: Response, next: NextFunction) {
    const {name, email, password, sobrenome} = req.body;

    //Verificando se todos os campos foram preenchidos
    if (!name || !email || !password) {
        res.status(400).json({message: 'Todos os campos são obrigatórios.'});
        return;
    }

    
    try {
        //Se o email for preenchido, verificar se já existe no banco de dados.
        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        })

        //Validando se já existe no banco.

        if(usuarioExistente) {
            res.status(400).json({message: 'Usuário já existe, informe um email diferente.'});
            return;
        }

        //Criptografando a senha
        const senhaCriptografada = await bcrypt.hash(password, 10);
        //Criando usuario no banco de dados.

        const usuario = await prisma.usuario.create({
            data: {
                nome: name,
                sobrenome: sobrenome,
                email: email,
                senha: senhaCriptografada,
                tipo: 'usuario', // Definindo o tipo como 'usuario' por padrão
                role: 'user' // Definindo o role como 'user' por padrão
            }
        })

        //Retornando usuario criado.
        res.status(201).json({
            message: 'Usuário criado com sucesso.',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                email: usuario.email,
                tipo: usuario.tipo,
                role: usuario.role
            }
        });
    } catch (error) {
        //Se acontecer algum erro, retorna o erro.

        console.error('Erro ao criar usuário:', error);
        res.status(500).json({message: 'Erro ao criar usuário.'});
    }
   
}