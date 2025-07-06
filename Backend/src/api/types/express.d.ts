// Esse arquivo "diz" ao TypeScript que estamos adicionando propriedades no objeto Request

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: {
        id: number;
        name: string;
        surname: string;
        role: string;
        email: string;
      };
    }
  }
}

export {};
