import React, { useState } from 'react';
import '../../index.css'
import logo from '../../assets/logo.png';
import Input from '../../Components/Input';  
import Button from '../../Components/Button';
import { Eye, EyeOff } from 'lucide-react';
import {Link} from 'react-router-dom';
import { useTogglePassword} from '../../hooks/useTogglepassword';
import { fetchRegister } from './fetchRegisterAPI';


function Register() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    setSucesso("");

    // Validações
    if (email !== confirmEmail) {
      setErro("Os emails não coincidem.");
      setCarregando(false);
      return;
    }

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem.");
      setCarregando(false);
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      setCarregando(false);
      return;
    }

    try {
      const resposta = await fetchRegister(nomeCompleto, email, senha);
      
      setSucesso("Conta criada com sucesso! Você pode fazer login agora.");
      // Limpar os campos
      setNomeCompleto("");
      setInstituicao("");
      setEmail("");
      setConfirmEmail("");
      setSenha("");
      setConfirmSenha("");
      
      // Opcional: redirecionar para login após alguns segundos
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Erro no cadastro");
      }
    } finally {
      setCarregando(false);
    }
  };

  const{ mostrarSenha, toggleSenha } = useTogglePassword();
  // const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
  <div className="min-h-screen w-full overflow-x-hidden flex justify-center items-center bg-[#F3C50D]">
    <div className="bg-[#FDF2BF] w-full  max-w-[500px]  rounded-lg shadow-lg flex flex-col mt-5 pt-1 p-5 mx-4 mb-5">
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
        autocomplete="name"
        required/>

        {/* Institution Input */}
        <label htmlFor="institution">Instituição</label>
        <Input type="text" 
        id="institution" 
        placeholder="Digite sua instituição"
        autocomplete="institution" 
        required/>

        {/* Email and Confirm Email*/}
        <label htmlFor="confirmEmail">Email</label>
        <Input type="email" 
        id="email" 
        placeholder="Digite seu email" 
        autocomplete="email"
        required/>

        <label htmlFor="email">Cofirmar Email</label>
        <Input type="email" 
        id="confirmEmail" 
        placeholder="Confirme seu email"
        autocomplete="email" 
        required/>
         

         {/* Passwords and confirm Password with Eyesoff/ON**/}
        <label htmlFor="password">Senha</label> 
        
        <div className='relative  items-center mb-2'>
        <Input type={mostrarSenha ? "text" : "password"} 
        id="password" 
        placeholder="Digite sua senha"
        autocomplete="current-password"
        minLength={6}
        required />

        
        <span className='absolute right-3 top-5 mt-1 mb-2 cursor-pointer' onClick={toggleSenha}>
          {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20}/>} 
          </span>
        </div>
          
          <label htmlFor="confirmPass">Confirme sua Senha</label> 
        
        <div className='relative  items-center mb-2'>
        <Input type={mostrarSenha ? "text" : "password"} 
        id="confirmPass" 
        placeholder="Digite sua senha"
        autocomplete="current-password"
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
