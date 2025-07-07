import '../../index.css';
import logo from '../../assets/logo.png';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useTogglePassword } from '../../hooks/useTogglepassword';
import { fetchLogin } from './fetchLoginAPI'; // Ensure this path is correct
import { useState } from 'react';

function Login() {
  const { mostrarSenha, toggleSenha } = useTogglePassword();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchLogin(email, password);
      console.log('Login successful:', data);
      // Here you would typically store the token (e.g., in localStorage or a context)
      // and redirect the user to a protected route.
      navigate('/dashboard'); // Example redirect
    } catch (err) {
      console.error('Login error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#F3C50D]">
      <div className="bg-[#FDF2BF] w-[90%] max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded-lg shadow-lg flex flex-col mt-1 p-1 px-4">
        {/* Logo and Title Section */}
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="Logo" className="w-16 h-24 mr-2" />{' '}
          <span className="text-black text-3xl font-bold "> FocoTCC</span>
        </div>

        {/* informativo */}
        <div className="flex flex-col items-start justify-start text-black ">
          <h1 className=" text-3xl font-bold mb-3">Login</h1>
          <h2 className=" text-lg font-sans ">
            Insira suas credenciais para acessar o sistema
          </h2>
        </div>

        {/* Input Fields Section */}
        <form className="flex flex-col mt-3 font-sans font-semibold" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Senha</label>

          <div className="relative items-center mb-2">
            <Input
              type={mostrarSenha ? 'text' : 'password'}
              id="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Eyesoff/ON*/}
            <span
              className="absolute right-3 top-5 mt-1 mb-2 cursor-pointer"
              onClick={toggleSenha}
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center text-blue-900 font-semibold hover:opacity-45"
          >
            Esqueci a senha
          </Link>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Button Section */}
          <div className="flex mx-auto items-center justify-center mt-4 ">
            <Button type="submit" bgColor="bg-[#0F2C67]" width="w-72" height="h-11" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>

          {/* Link to Register Section */}
          <div className="flex flex-col items-center justify-center mt-3">
            <span className="flex flex-wrap flex-col font-semibold ">
              Não tem uma conta?
            </span>
            <Link
              to="/register"
              className="text-blue-900 font-bold hover:opacity-45"
            >
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;