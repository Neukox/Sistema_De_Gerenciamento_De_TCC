// src/pages/Login/fetchLoginAPI.ts (or wherever you placed this file)


interface LoginResponseSuccess {
  token: string;
  message: string;
  success: true;
  usuario: {
    id: string; // Assuming ID is a string (UUID) from Prisma
    nomeCompleto: string;
    email: string;
    tipo: string;
    role: string;
  };
}

interface LoginResponseError {
  message: string;
  success: false;
}

// Union type for the possible responses
type LoginResponse = LoginResponseSuccess | LoginResponseError;


export async function fetchLogin(email: string, senha: string): Promise<LoginResponseSuccess> {
  const response = await fetch("http://localhost:3000/api/login", { // Ensure this URL matches your backend route
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: senha }), // Backend expects 'password', not 'senha'
  });

  const data: LoginResponse = await response.json();

  if (!response.ok) {
    // If response.ok is false, it means the HTTP status code was 4xx or 5xx.
    // The backend sends a 'message' property for errors.
    const errorMessage = data.message || "Erro desconhecido ao fazer login.";
    throw new Error(errorMessage);
  }

  // If response.ok is true, we expect a successful LoginResponseSuccess
  if (data.success) {
    return data; // This cast ensures TypeScript knows it's a success type
  } else {
    // This case theoretically shouldn't be hit if response.ok is true and backend is consistent,
    // but good for explicit typing or if backend sends success:false with 200 OK.
    throw new Error(data.message || "Login falhou.");
  }
}