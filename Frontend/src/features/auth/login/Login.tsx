import { useEffect } from "react";
import { Input, Button, Label, InputPassword } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 * Componente de Login.
 * Este componente exibe um formulário de login com campos para email e senha,
 * e um link para recuperação de senha.
 * Ao enviar o formulário, redireciona para o Dashboard principal.
 */
function Login() {
  useEffect(() => {
    document.title = "FocoTCC - Login";
  }, []);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/maindashboard");
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
  };

  return (
    <>
      <form
        className="w-full flex flex-col items-center gap-3 fpont-sans font-semibold"
        onSubmit={handleLogin}
        noValidate
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu email"
              autoComplete="email"
              name="email"
              required
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="password">Senha</Label>
            <InputPassword
              className="w-full"
              id="password"
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        <Link
          to="/"
          className="flex items-center justify-center text-primary font-semibold hover:opacity-85"
        >
          Esqueci a senha
        </Link>

        <Button type="submit" variant="primary" className="w-full">
          Entrar
        </Button>
      </form>
    </>
  );
}

export default Login;
