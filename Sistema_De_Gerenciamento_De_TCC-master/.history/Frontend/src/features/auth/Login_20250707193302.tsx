import '../../index.css';
import logo from '../../assets/logo.png';
import Input from '../../Components/Input';  
import Button from '../../Components/Button';
import {Link} from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useTogglePassword} from '../../hooks/useTogglepassword';
import fetch


function Login() {


  const{ mostrarSenha, toggleSenha } = useTogglePassword();
  // const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
  <div className="h-screen w-screen flex justify-center items-center bg-[#F3C50D]">
    <div className="bg-[#FDF2BF] w-[90%]  max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded-lg shadow-lg flex flex-col mt-1 p-1 px-4">
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
      <form className="flex flex-col mt-3 fpont-sans font-semibold">
        
        <label htmlFor="email">Email</label>
        <Input type="email" 
        id="email" 
        placeholder="Digite seu email" 
        autocomplete="email"
        required/>
       
        <label htmlFor="password">Senha</label> 
        
        <div className='relative  items-center mb-2'>
        <Input type={mostrarSenha ? "text" : "password"} 
        id="password" 
        placeholder="Digite sua senha"
        autocomplete="current-password"
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
