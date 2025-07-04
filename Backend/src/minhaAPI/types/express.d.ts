// Esse arquivo "diz" ao TypeScript que estamos adicionando a propriedade `token` no objeto Request
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    token?: string;
    Role?: Role;
  }
}
