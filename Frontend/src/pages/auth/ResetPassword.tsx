// RecuperacaoSenha.tsx
import { useState } from 'react';
import logo from '../../assets/logo.png';
import { API_CONFIG } from '../../config/api';

import {
  Input,
  Button,
  Label,
} from "@/components/ui/form";


// Tipagens para a API de recuperação de senha
interface PasswordResetRequestResponse {
  message: string;
  success: boolean;
}

interface PasswordResetRequestData {
  email: string;
}

// Função para validar email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para solicitar recuperação de senha
const fetchRequestPasswordReset = async (
  requestData: PasswordResetRequestData
): Promise<PasswordResetRequestResponse> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET}`,
      {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      // Tenta pegar a mensagem de erro do backend
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      } catch {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    }

    const data: PasswordResetRequestResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro desconhecido ao solicitar recuperação de senha');
  }
};

export function RecuperacaoSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!email.trim()) {
      setMessage('Por favor, insira seu email.');
      setMessageType('error');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Por favor, insira um email válido.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const requestData: PasswordResetRequestData = { email: email.trim() };
      const response = await fetchRequestPasswordReset(requestData);
      
      if (response.success) {
        setMessage('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada e spam.');
        setMessageType('success');
        setEmail(''); // Limpa o campo após sucesso
      } else {
        setMessage(response.message || 'Erro ao enviar email de recuperação.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      // Tratamento mais específico de erros
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          setMessage('Email não encontrado em nosso sistema.');
        } else if (error.message.includes('500')) {
          setMessage('Erro interno do servidor. Tente novamente mais tarde.');
        } else {
          setMessage(error.message);
        }
      } else {
        setMessage('Erro interno do servidor. Tente novamente mais tarde.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="bg-secondary w-screen min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral w-full max-w-md rounded-md shadow-lg flex flex-col items-center overflow-hidden"
      >
        {/* Header com logo e título */}
        <div className="flex items-center justify-center w-full px-4 py-4 border-b border-gray-200">
          <img src={logo} className="w-[60px] h-20" alt="Logo do Sistema" />
          <h1 className="text-3xl ml-2 font-semibold">FocoTCC</h1>
        </div>

        {/* Conteúdo principal */}
        <div className="w-full px-6 py-6 flex flex-col items-center">
          {/* Título da página */}
          <h2 className="text-3xl font-bold mb-2 text-center">
            Recuperação de Senha
          </h2>
          <p className="text-center mb-6 text-lg font-sans">
            Insira seu e-mail para redefinir sua senha.
          </p>

          {/* Mensagem de feedback */}
          {message && (
            <div className={`w-full mb-4 p-3 rounded ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {message}
            </div>
          )}

          {/* Input de email */}
          <div className="w-full mb-4">
            <Label htmlFor="email" >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              placeholder="Digite seu email"
              disabled={loading}
              required
            />
          </div>

          {/* Botão de enviar */}
          <Button
            type="submit"
            disabled={loading}
            variant='primary'
            className={`w-full ${
              loading 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-primary text-white hover:opacity-80 '
            }`}
          >
            {loading ? 'Enviando...' : 'Redefinir Senha'}
          </Button>

          {/* Rodapé */}
          <div className="flex flex-row items-center justify-center mt-6 gap-1 text-sm">
            <p className=' font-semibold hover:opacity-85'>Lembrou da sua senha?</p>
            <a href="/login" className="text-primary font-bold hover:opacity-85">
              Voltar ao login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
