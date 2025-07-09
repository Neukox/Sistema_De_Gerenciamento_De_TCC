import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../../prisma/PrismaClient/prisma';

export async function Registro(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {nomeCompleto, instituicao, email, confirmEmail, senha, confirmSenha} = req.body;

    //Verificando se todos os campos foram preenchidos
    if (!nomeCompleto || !instituicao || !email || !confirmEmail || !senha || !confirmSenha) {
        res.status(400).json({
            message: 'Por favor, preencha todos os campos obrigatórios para continuar.',
            success: false
        });
        return;
    }

    // Validação se os emails coincidem
    if (email !== confirmEmail) {
        res.status(400).json({
            message: 'Os emails informados não coincidem. Verifique e tente novamente.',
            success: false
        });
        return;
    }

    // Validação se as senhas coincidem
    if (senha !== confirmSenha) {
        res.status(400).json({
            message: 'As senhas informadas não coincidem. Verifique e tente novamente.',
            success: false
        });
        return;
    }

    // Validação básica do formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ 
            message: 'Por favor, informe um email válido.',
            success: false 
        });
        return;
    }

    // Validação do tamanho da senha
    if (senha.length < 6) {
        res.status(400).json({
            message: 'A senha deve ter pelo menos 6 caracteres.',
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
        });

        //Validando se já existe no banco.
        if(usuarioExistente) {
            res.status(400).json({
                message: 'Este email já está sendo usado. Tente fazer login ou use outro email.',
                success: false
            });
            return;
        }

        //Criptografando a senha
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
                curso: '', // Campo vazio por enquanto, será preenchido no cadastro do TCC
                instituicao: instituicao.trim()
            }
        });

        //Retornando usuario criado.
        res.status(201).json({
            message: 'Usuário criado com sucesso.',
            success: true,
            usuario: {
                id: usuario.id,
                nomeCompleto: usuario.nomeCompleto,
                email: usuario.email,
                instituicao,
                tipo: usuario.tipo,
                role: usuario.role
            }
        });
    } catch (error) {
        //Se acontecer algum erro, retorna o erro.
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({
            message: 'Erro interno do servidor.',
            success: false,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}