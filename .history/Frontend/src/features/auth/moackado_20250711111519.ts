export interface LoginData {
  email: string;
  password: string;
}

export async function fetchLogin(data: LoginData): Promise<{ success: boolean }> {
  // Simulando um pequeno delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Credenciais de teste
  const mockUser = {
    email: 'teste@exemplo.com',
    password: '123456'
  };

  if (data.email === mockUser.email && data.password === mockUser.password) {
    return { success: true };
  } else {
    throw new Error('Email ou senha incorretos');
  }
}