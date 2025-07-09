import '../../index.css'
import logo from '../../assets/logo.png';
import Input from '../../Components/Input';  
import Button from '../../Components/Button';
import { Eye, EyeOff } from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import { useTogglePassword} from '../../hooks/useTogglepassword';
import { useEffect, useState } from 'react';
import { fetchRegisterAPI, type RegisterData } from './fetchRegisterAPI';



function Register() {
   
  useEffect(() => {
      document.title = 'FocoTCC - Registro';
    }, []);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const registerData: RegisterData = {
      nomeCompleto: formData.get('nomeCompleto') as string,
      instituicao: formData.get('institution') as string,
      email: formData.get('email') as string,
      confirmEmail: formData.get('confirmEmail') as string,
      senha: formData.get('password') as string,
      confirmSenha: formData.get('confirmPass') as string,
    };

    try {
      const response = await fetchRegisterAPI(registerData);
      
      if (response.success) {
        setSuccessMessage(response.message);
        // Redireciona para login após 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const{ mostrarSenha, toggleSenha } = useTogglePassword();
  // const [mostrarSenha, setMostrarSenha] = useState(false);

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
      <form className="flex flex-col mt-2 text-black font-sans font-semibold">
        
        {/* Name Input */}
        <label htmlFor="Nome">Nome completo</label>
        <Input type="text" 
        id="Nome" 
        placeholder="Digite seu nome completo"  
        autoComplete="name"
        required/>

        {/* Institution Input */}
        <label htmlFor="institution">Instituição</label>
        <Input type="text" 
        id="institution" 
        placeholder="Digite sua instituição"
        autoComplete="institution" 
        required/>

        {/* Email and Confirm Email*/}
        <label htmlFor="confirmEmail">Email</label>
        <Input type="email" 
        id="email" 
        placeholder="Digite seu email" 
        autoComplete="email"
        name='email'
        required/>

        <label htmlFor="email">Cofirmar Email</label>
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
        <Button type="submit" bgColor="bg-[#0F2C67]" width="w-72" height='h-11'>Criar Conta</Button>
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
