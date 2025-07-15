import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { API_CONFIG } from '../../config/api';

// Tipagens para a API de redefinição de senha
interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

interface ResetPasswordData {
  usuario_id: number;
  token: string;
  nova_senha: string;
}

// Função para validar senha
const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'A senha deve ter pelo menos 6 caracteres.' };
  }
  return { isValid: true, message: '' };
};

// Função para redefinir senha
const fetchResetPassword = async (
  resetData: ResetPasswordData
): Promise<ResetPasswordResponse> => {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD}`,
      {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(resetData),
      }
    );

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      } catch {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    }

    const data: ResetPasswordResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro desconhecido ao redefinir senha');
  }
};

export function ConfirmResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
    
    // Pegar parâmetros da URL (token e usuario_id)
    const { token, userId } = useParams<{ token: string; userId: string }>();
    const navigate = useNavigate();

    // Verificar se os parâmetros necessários estão presentes
    useEffect(() => {
        if (!token || !userId) {
            setMessage('Link de recuperação inválido ou expirado.');
            setMessageType('error');
        }
    }, [token, userId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validações básicas
        if (!newPassword.trim()) {
            setMessage('Por favor, insira sua nova senha.');
            setMessageType('error');
            return;
        }

        if (!confirmPassword.trim()) {
            setMessage('Por favor, confirme sua nova senha.');
            setMessageType('error');
            return;
        }

        // Validar força da senha
        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            setMessage(passwordValidation.message);
            setMessageType('error');
            return;
        }

        // Verificar se as senhas coincidem
        if (newPassword !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            setMessageType('error');
            return;
        }

        // Verificar se temos os parâmetros necessários
        if (!token || !userId) {
            setMessage('Link de recuperação inválido ou expirado.');
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const resetData: ResetPasswordData = {
                usuario_id: parseInt(userId, 10),
                token: token,
                nova_senha: newPassword.trim(),
            };

            const response = await fetchResetPassword(resetData);
            
            if (response.success) {
                setMessage('Senha redefinida com sucesso! Redirecionando para o login...');
                setMessageType('success');
                setNewPassword('');
                setConfirmPassword('');
                
                // Redirecionar para login após 3 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setMessage(response.message || 'Erro ao redefinir senha.');
                setMessageType('error');
            }
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            
            if (error instanceof Error) {
                if (error.message.includes('400')) {
                    setMessage('Token inválido ou expirado. Solicite uma nova recuperação de senha.');
                } else if (error.message.includes('404')) {
                    setMessage('Usuário não encontrado.');
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
    };
    return (
        <div className="bg-[#F3C50D] w-screen h-screen flex justify-center items-center">
            <div className="bg-white w-[500px] max-w-md h-[600px] p-6 rounded-xl shadow-lg flex flex-col items-center">
                <div className="flex flex-col items-center mb-4">
                    <img src={logo} className="w-[60px] h-20 mb-2" alt="Logo do Sistema" />
                    <h1 className="text-3xl -mt-2 font-semibold">FocoTCC</h1>
                </div>

                <h2 className="text-4xl font-bold mb-6">Definir Nova Senha</h2>

                <p className="text-sm mb-8 text-center">
                    Insira sua nova senha para acessar sua conta.
                </p>

                {/* Mensagem de feedback */}
                {message && (
                    <div className={`w-full mb-4 p-3 rounded text-center ${
                        messageType === 'success' 
                            ? 'bg-green-100 text-green-700 border border-green-300' 
                            : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <label htmlFor="new-password" className="block text-sm font-medium mt-2">
                        Nova Senha
                    </label>

                    {/* Aqui você pode colocar outros elementos do formulário */}

                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 border border-gray-400 rounded-lg  focus:outline-none focus:ring-2"
                        placeholder="Digite sua nova senha"
                        disabled={loading || !token || !userId}
                        required
                    />

                    {/* Confirmar senha. */}

                    <label htmlFor="confirm-password" className="block text-sm font-medium mt-2">
                        Confirmar Nova Senha
                    </label>

                    <input
                        type="password"
                        id="confirm-password"
                        className="w-full p-3 border border-gray-400 rounded-lg  focus:outline-none focus:ring-2"
                        placeholder="Confirme sua nova senha"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-6 bg-primary hover:opacity-80 text-white font-semibold py-2 rounded transition"
                    >
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
}
