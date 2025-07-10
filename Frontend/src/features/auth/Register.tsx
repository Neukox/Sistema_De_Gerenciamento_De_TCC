import '../../index.css'
import logo from '../../assets/logo.png';
import Input from '../../components/ui/form/Input';  
import Button from '../../components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import { useTogglePassword} from '../../hooks/useTogglepassword';
import { useEffect, useState } from 'react';
import { 
  fetchRegister, 
  type RegisterData, 
  validatePasswordMatch, 
  validateEmailMatch, 
  validatePasswordStrength 
} from './fetchRegisterAPI';



function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [userType, setUserType] = useState<'ALUNO' | 'PROFESSOR'>('ALUNO');
   
  useEffect(() => {
      document.title = 'FocoTCC - Registro';
    }, []);

  const navigate = useNavigate();
  const{ mostrarSenha, toggleSenha } = useTogglePassword();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const nome_completo = formData.get('nome') as string;
    const instituicao = formData.get('instituicao') as string;
    const email = formData.get('email') as string;
    const confirmEmail = formData.get('confirmEmail') as string;
    const senha = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPass') as string;
    const curso = formData.get('curso') as string;
    const area_atuacao = formData.get('area_atuacao') as string;

    // Validações
    if (!nome_completo || !instituicao || !email || !confirmEmail || !senha || !confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    if (!validateEmailMatch(email, confirmEmail)) {
      setError('Os emails não coincidem.');
      setIsLoading(false);
      return;
    }

    if (!validatePasswordStrength(senha)) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    if (!validatePasswordMatch(senha, confirmPassword)) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    try {
      const registerData: RegisterData = {
        nome_completo,
        email,
        senha,
        tipo: userType,
        instituicao,
        ...(curso && { curso }),
        ...(area_atuacao && { area_atuacao }),
      };

      const response = await fetchRegister(registerData);
      
      if (response.success) {
        // Registro bem-sucedido, redireciona para o dashboard
        navigate('/maindashboard');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao criar conta';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen w-full overflow-x-hidden flex justify-center items-center bg-[#F3C50D]">
    <div className="bg-[#fffbef] w-full  max-w-[500px]  rounded-lg shadow-lg flex flex-col mt-5 pt-1 p-5 mx-4 mb-5">
      {/* Logo and Title Section */}
      <div className='flex flex-row items-center justify-center'>
       <img src={logo} alt="Logo" className="w-16 h-24 mr-2" /> <span className='text-black text-3xl font-bold '> FocoTCC</span>
      </div>

       {/* informativo */}
       <div className='flex flex-col items-center justify-center text-black '>
         <h1 className=" text-3xl font-bold mb-2">Cadastro</h1>
         <h2 className=' text-lg font-sans '>Crie sua conta para acessar o sistema</h2>
       </div>
      {/* Input Fields Section */}
      <form className="flex flex-col mt-2 text-black font-sans font-semibold" onSubmit={handleRegister}>
        
        {/* Exibição de erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* User Type Selection */}
        <label htmlFor="userType">Tipo de usuário</label>
        <select 
          id="userType" 
          value={userType} 
          onChange={(e) => setUserType(e.target.value as 'ALUNO' | 'PROFESSOR')}
          className="mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="ALUNO">Aluno</option>
          <option value="PROFESSOR">Professor</option>
        </select>

        {/* Name Input */}
        <label htmlFor="nome">Nome completo</label>
        <Input type="text" 
        id="nome" 
        placeholder="Digite seu nome completo"  
        autoComplete="name"
        name="nome"
        required/>

        {/* Institution Input */}
        <label htmlFor="instituicao">Instituição</label>
        <Input type="text" 
        id="instituicao" 
        placeholder="Digite sua instituição"
        autoComplete="organization" 
        name="instituicao"
        required/>

        {/* Course Input - apenas para alunos */}
        {userType === 'ALUNO' && (
          <>
            <label htmlFor="curso">Curso</label>
            <Input type="text" 
            id="curso" 
            placeholder="Digite seu curso"
            name="curso"/>
          </>
        )}

        {/* Area of expertise - apenas para professores */}
        {userType === 'PROFESSOR' && (
          <>
            <label htmlFor="area_atuacao">Área de Atuação</label>
            <Input type="text" 
            id="area_atuacao" 
            placeholder="Digite sua área de atuação"
            name="area_atuacao"/>
          </>
        )}

        {/* Email and Confirm Email*/}
        <label htmlFor="email">Email</label>
        <Input type="email" 
        id="email" 
        placeholder="Digite seu email" 
        autoComplete="email"
        name='email'
        required/>

        <label htmlFor="confirmEmail">Confirmar Email</label>
        <Input type="email" 
        id="confirmEmail" 
        placeholder="Confirme seu email"
        autoComplete="email" 
        name='confirmEmail'
        required/>
         

         {/* Passwords and confirm Password with Eyesoff/ON**/}
        <label htmlFor="password">Senha</label> 
        
        <div className='relative  items-center mb-2'>
        <Input type={mostrarSenha ? "text" : "password"} 
        id="password" 
        placeholder="Digite sua senha"
        autoComplete="current-password"
        minLength={6}
        required
        name='password'
       />

        
        <span className='absolute right-3 top-5 mt-1 mb-2 cursor-pointer' onClick={toggleSenha}>
          {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20}/>} 
          </span>
        </div>
          
          <label htmlFor="confirmPass">Confirme sua Senha</label> 
        
        <div className='relative  items-center mb-2'>
        <Input type={mostrarSenha ? "text" : "password"} 
        id="confirmPass" 
        placeholder="Digite sua senha"
        autoComplete="current-password"
        name='confirmPass'
        minLength={6}
        required />

        
        <span className='absolute right-3 top-5 mt-1 mb-2 cursor-pointer' onClick={toggleSenha}>
          {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20}/>} 
          </span>
        </div>
        
        
        {/* Button Section */}
       <div className="flex mx-auto items-center justify-center mt-4 ">
        <Button 
          type="submit" 
          bgColor="bg-[#0F2C67]" 
          width="w-72" 
          height='h-11'
          disabled={isLoading}
        >
          {isLoading ? 'Criando conta...' : 'Criar Conta'}
        </Button>
       </div>

       {/* Link to Register Section */}
        <div className='flex flex-col items-center justify-center mt-3' >
          <span className='flex flex-wrap flex-col font-semibold '>Já tem uma conta?</span>
          <Link to="/login" className='text-blue-900 font-bold hover:opacity-45'>Faça Login</Link>
        </div>
  
      </form>
      
      
    </div>
  </div>
  );
}

export default Register;
