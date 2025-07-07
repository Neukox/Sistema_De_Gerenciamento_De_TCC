import React, { useState } from "react";
import '../../index.css';
import logo from '../../assets/logo.png';
import Input from '../../Components/Input';  
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useTogglePassword } from '../../hooks/useTogglepassword';
import { fetchLogin } from './fetchLoginAPI';

function Login() {
  const { mostrarSenha, toggleSenha } = useTogglePassword();

  // Estados para controlar inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // Função para lidar com submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita reload da página

    try {
      const resposta = await fetchLogin(email, senha);
      console.log("Login OK:", resposta);
      
      if (resposta.token) {
        localStorage.setItem("token", resposta.token);
        setErro("");
        // Aqui você pode redirecionar ou atualizar estado global
      } else {
        setErro("Token não recebido do servidor.");
      }

    } catch (error: any) {
      setErro(error.message || "Erro no login");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#F3C50D]">
      <div className="bg-[#FDF2BF] w-[90%] max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded-lg shadow-lg flex flex-col mt-1 p-1 px-4">
        {/* Logo and Title Section */}
        <div className='flex flex-row items-center justify-center'>
          <img src={logo} alt="Logo" className="w-16 h-24 mr-2" />
          <span className='text-black text-3xl font-bold'>FocoTCC</span>
        </div>

        {/* Informativo */}
        <div className='flex flex-col items-start justify-start text-black '>
          <h1 className="text-3xl font-bold mb-3">Login</h1>
          <h2 className='text-lg font-sans'>Insira suas credenciais para acessar o sistema</h2>
        </div>

        {/* Input Fields Section */}
        <form onSubmit={handleSubmit} className="flex flex-col mt-3 font-sans font-semibold">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <div className='relative items-center mb-2'>
            <Input
              type={mostrarSenha ? "text" : "password"}
              id="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />

            {/* Eyesoff/ON */}
            <span className='absolute right-3 top-5 mt-1 mb-2 cursor-pointer' onClick={toggleSenha}>
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <Link to="/" className='flex items-center justify-center text-blue-900 font-semibold hover:opacity-45'>Esqueci a senha</Link>

          {/* Button Section */}
          <div className="flex mx-auto items-center justify-center mt-4">
            <Button type="submit" bgColor="bg-[#0F2C67]" width="w-72" height='h-11'>Entrar</Button>
          </div>

          {erro && <p className="text-red-600 mt-2 text-center">{erro}</p>}

          {/* Link to Register Section */}
          <div className='flex flex-col items-center justify-center mt-3'>
            <span className='flex flex-wrap flex-col font-semibold'>Não tem uma conta?</span>
            <Link to="/register" className='text-blue-900 font-bold hover:opacity-45'>Cadastre-se</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
