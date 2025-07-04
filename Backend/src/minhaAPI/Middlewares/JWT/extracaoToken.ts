//Algoritmo de extração do token do header Authorizartion
import { Request, Response, NextFunction } from 'express';
import { getJwtConfig } from '../../ConfigJwt/config';

export function extrairToken(req: Request, res: Response, next: NextFunction)  {
    const authHeader = req.headers.authorization; //Pegando authorization do header da requisição.

    //Fazendo verificação se o header authorization existe.
    if (!authHeader) {
        res.status(401).json({ error: 'Token não fornecido.' });
        return;
    }

    try {
         //Verificando se o header authorization está no formato correto.
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({ error: 'Token mal formatado.' });
        return;
    }

    //Extraindo o token do header authorization.
    const token = parts[1];
    //Verificando se o token é válido.
    if (!token) {
        res.status(401).json({ error: 'Token inválido.' });
        return;
    }

    //Armazenando token na requisição para o proximo middleware ou rota.
    req.token = token; // Adicionando o token ao objeto da requisição.
    next();
    } catch (error) {
        //Se houver erro, retornando status 500.
        console.error('Erro ao extrair o token:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }

    //Visualizando token
    console.log('Token extraído:', req.token);

   

}