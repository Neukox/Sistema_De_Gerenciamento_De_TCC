import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../../prisma/PrismaClient/prisma';


export async function  Registro(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {nome, sobrenome, email, senha, tipo, curso, area_atuacao, disponibilidade} = req.body;

    //Verificando se todos os campos foram preenchidos
    if (!nome || !sobrenome || !email || !senha || !tipo) {
        res.status(400).json({
            message: 'Os campos nome, sobrenome, email, senha e tipo são obrigatórios.',
            success: false
        });
        return;
    }

    // Validação do tipo de usuário
    if (!['aluno', 'professor'].includes(tipo)) {
        res.status(400).json({
            message: 'Tipo deve ser "aluno" ou "professor".',
            success: false
        });
        return;
    }

    // Validação específica por tipo
    if (tipo === 'aluno' && !curso) {
        res.status(400).json({
            message: 'Campo "curso" é obrigatório para alunos.',
            success: false
        });
        return;
    }

    if (tipo === 'professor' && (!area_atuacao || disponibilidade === undefined)) {
        res.status(400).json({
            message: 'Campos "area_atuacao" e "disponibilidade" são obrigatórios para professores.',
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
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        // Usando transação para criar usuário e registro específico
        const resultado = await prisma.$transaction(async (tx) => {
            // Criando usuario no banco de dados.
            const usuario = await tx.usuario.create({
                data: {
                    nome,
                    sobrenome,
                    email: email.toLowerCase(),
                    senha: senhaCriptografada,
                    tipo,
                    role: 'user' // Definindo o role como 'user' por padrão
                }
            });

            // Criar registro específico baseado no tipo
            if (tipo === 'aluno') {
                await tx.aluno.create({
                    data: {
                        id: usuario.id,
                        curso
                    }
                });
            } else if (tipo === 'professor') {
                await tx.professor.create({
                    data: {
                        id: usuario.id,
                        area_atuacao,
                        disponibilidade: disponibilidade === true || disponibilidade === 'true'
                    }
                });
            }

            return usuario;
        });

        //Retornando usuario criado.
        res.status(201).json({
            message: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} criado com sucesso.`,
            success: true,
            usuario: {
                id: resultado.id,
                nome: resultado.nome,
                sobrenome: resultado.sobrenome,
                email: resultado.email,
                tipo: resultado.tipo,
                role: resultado.role,
                ...(tipo === 'aluno' ? { curso } : {}),
                ...(tipo === 'professor' ? { area_atuacao, disponibilidade } : {})
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