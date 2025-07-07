import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../../prisma/PrismaClient/prisma';


export async function  Registro(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {name, email, password, sobrenome} = req.body;

    //Verificando se todos os campos foram preenchidos
    if (!name || !email || !password) {
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
    
    try {
        //Se o email for preenchido, verificar se já existe no banco de dados.
        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })

        //Validando se já existe no banco.
        if(usuarioExistente) {
            res.status(400).json({
                message: 'Usuário já existe, informe um email diferente.',
                success: false
            });
            return;
        }

        //Criptografando a senha
<<<<<<< HEAD
        const senhaCriptografada = await bcrypt.hash(password, 10);
        //Criando usuario no banco de dados.

        const usuario = await prisma.usuario.create({
            data: {
                nome: name,
                sobrenome: sobrenome,
                email: email.toLowerCase(),
                senha: senhaCriptografada,
                tipo: 'usuario', // Definindo o tipo como 'usuario' por padrão
                role: 'user' // Definindo o role como 'user' por padrão
            }
        })
=======
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        // Criando usuario no banco de dados.
        const usuario = await prisma.usuario.create({
            data: {
                nomeCompleto: nomeCompleto.trim(),
                email: email.toLowerCase(),
                senha: senhaCriptografada,
                tipo: 'aluno', // Por padrão, todos são alunos
                role: 'user' // Definindo o role como 'user' por padrão
            }
        });

        // Criar registro de aluno automaticamente
        await prisma.aluno.create({
            data: {
                id: usuario.id,
                instituicao: instituicao
            }
        });
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c

        //Retornando usuario criado.
        res.status(201).json({
            message: 'Usuário criado com sucesso.',
            success: true,
            usuario: {
                id: usuario.id,
<<<<<<< HEAD
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                email: usuario.email,
=======
                nomeCompleto: usuario.nomeCompleto,
                email: usuario.email,
                instituicao,
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c
                tipo: usuario.tipo,
                role: usuario.role
            }
        });
    } catch (error) {
        //Se acontecer algum erro, retorna o erro.
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
<<<<<<< HEAD
            success: false
=======
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
>>>>>>> 1a921ee2d30067305bbb31c1a612f5391164170c
        });
    }
   
}