//Algoritmo de autorização de requisições com JWT.
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getJwtConfig } from '../../ConfigJwt/config';

// Estendendo a interface Request para incluir user
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    tipo: string;
    email: string;
  };
}


/*O middleware de autorização é o middleware responsável por verificar oque o usuário pode ou nao fazer.*/

export async function autorizacao(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    //0btendo o token do header Authorization
    const authHeader = req.headers.authorization;
    //Verificando se o token foi enviado.
    if(!authHeader) {
        res.status(401).json({
            message: 'Token não fornecido.',
            success: false
        });
        return;
    }
    try {
         //Extraindo o token do header Authorization
        const token = authHeader.split(' '); 
        if (token.length !== 2 || token[0] !== 'Bearer') {
            res.status(401).json({
                message: 'Token inválido.',
                success: false
            });
            return;
        }

        //Verificando se o token é válido.
        const jwtConfig = getJwtConfig();
        const decoded = jwt.verify(token[1], jwtConfig.secret as string) as { id: number; role: string; tipo: string; email: string };
        
        // Adiciona as informações do usuário ao request
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token inválido.',
            success: false
        });
        return;
    }
   

}