import '../../index.css';
import logo from '../../assets/logo.png';
import Input from '../../Components/Input';  
import Button from '../../Components/Button';
import { Link} from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useTogglePassword} from '../../hooks/useTogglepassword';
import { useNavigate  } from 'react-router-dom';  
import { useEffect, useState } from 'react';
import { fetchLoginAPI, type LoginData } from './fetchLoginAPI';


function Login() {
 
  useEffect(() => {
      document.title = 'FocoTCC - Login';
    }, []);

  const navigate = useNavigate();

   const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/maindashboard');
   /* const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (email && password.length > 6) {
       alert('Login realizado com sucesso!'); // Exibe um alerta de sucesso
       // Redireciona para o Dashboard após o login

    } else {
      alert('Por favor, preencha todos os campos corretamente.'); // Exibe um alerta de erro
    } if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.'); // Exibe um alerta de erro
    }*/
   
   }

  const{ mostrarSenha, toggleSenha } = useTogglePassword();
  
  return (
  <div className="h-screen w-screen flex justify-center items-center bg-[#F3C50D]">
    <div className="bg-[#fffbef] w-[90%]  max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded-lg shadow-lg flex flex-col mt-1 p-1 px-4">
      
       {/* Logo and Title Section */}
      <div className='flex flex-row items-center justify-center'>
       <img src={logo} alt="Logo" className="w-16 h-24 mr-2" /> <span className='text-black text-3xl font-bold '> FocoTCC</span>
      </div>

       {/* informativo */}
       <div className='flex flex-col items-start justify-start text-black '>
         <h1 className=" text-3xl font-bold mb-3">Login</h1>
         <h2 className=' text-lg font-sans '>insira suas credenciais para acessar o sistema</h2>
       </div>
      {/* Input Fields Section */}
      <form className="flex flex-col mt-3 fpont-sans font-semibold " onSubmit={handleLogin} noValidate>
        
        <label htmlFor="email">Email</label>
        <Input type="email" 
        id="email" 
        placeholder="Digite seu email" 
        autoComplete="email"
        name='email'
        required/>
       
        <label htmlFor="password">Senha</label> 
        
        <div className='relative  items-center mb-2'>
        <Input type={mostrarSenha ? "text" : "password"} 
        id="password" 
        placeholder="Digite sua senha"
        autoComplete="current-password"
        name='password'
        required />

        {/* Eyesoff/ON*/}
        <span className='absolute right-3 top-5 mt-1 mb-2 cursor-pointer' onClick={toggleSenha}>
          {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20}/>} 
          </span>
          </div>
          
        <Link to= "/"  className='flex items-center justify-center text-blue-900 font-semibold hover:opacity-45'>Esqueci a senha</Link>
        
        {/* Button Section */}
       <div className="flex mx-auto items-center justify-center mt-4 ">
        <Button type="submit" bgColor="bg-[#0F2C67]" width="w-72" height='h-11'>Entrar</Button>
       </div>

        {/* Link to Register Section */}
        <div className='flex flex-col items-center justify-center mt-3' >
          <span className='flex flex-wrap flex-col font-semibold '>Não tem uma conta?</span>
          <Link to="/register" className='text-blue-900 font-bold hover:opacity-45'>Cadastre-se</Link>
        </div>
       
      </form>
      
      
    </div>
  </div>
  );
}

export default Login;
