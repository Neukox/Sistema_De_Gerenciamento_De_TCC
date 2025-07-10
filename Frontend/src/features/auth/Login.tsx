import logo from "../../assets/logo.png";
import { Input, Button, Label, InputPassword } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  useEffect(() => {
    document.title = 'FocoTCC - Login';
    document.title = "FocoTCC - Login";
  }, []);

  const navigate = useNavigate();

  // Função para simular login local
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/maindashboard");
    /* const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    } else {
      alert('Por favor, preencha todos os campos corretamente.'); // Exibe um alerta de erro
  };
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));

    // Busca usuário mockado
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      setError('Email ou senha incorretos.');
      setIsLoading(false);
      return;
    }

    // Simula token e salva no localStorage
    localStorage.setItem('authToken', 'mock-token-' + user.id);
    localStorage.setItem('userData', JSON.stringify(user));
    navigate('/maindashboard');
    setIsLoading(false);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#F3C50D]">
      <div className="bg-[#fffbef] w-[90%]  max-w-[400px] md:max-w-[500px] lg:max-w-[600px] rounded-lg shadow-lg flex flex-col mt-1 p-1 px-4">
        {/* Logo and Title Section */}
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="Logo" className="w-16 h-24 mr-2" />{" "}
          <span className="text-black text-3xl font-bold "> FocoTCC</span>
        </div>

        {/* informativo */}
        <div className="flex flex-col items-start justify-start text-black ">
          <h1 className=" text-3xl font-bold mb-3">Login</h1>
          <h2 className=" text-lg font-sans ">
            insira suas credenciais para acessar o sistema
          </h2>
        </div>
        {/* Input Fields Section */}
        <form
          className="flex flex-col gap-4 mt-3 fpont-sans font-semibold "
          onSubmit={handleLogin}
          noValidate
        >
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu email"
              autoComplete="email"
              name="email"
              required
            />
          </div>

          <div className="w-full">
            <Label htmlFor="password">Senha</Label>
            <InputPassword
              className="w-full"
              id="password"
              placeholder="Digite sua senha"
            />
          </div>

          <Link
            to="/"
            className="flex items-center justify-center text-blue-900 font-semibold hover:opacity-45"
          >
            Esqueci a senha
          </Link>

          {/* Button Section */}
          <div className="flex mx-auto items-center justify-center mt-4 ">
            <Button type="submit" variant="primary" className="w-80">
              Entrar
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
