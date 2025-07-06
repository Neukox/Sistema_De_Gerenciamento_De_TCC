// Arquivo de contratos para o serviço de autenticação
// Este arquivo define as interfaces e tipos utilizados no serviço de autenticação.

export interface ILoginService {
  email: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: {
    id: number;
    name: string;
    nameInitials: string;
    role: string;
    email: string;
  };
}
