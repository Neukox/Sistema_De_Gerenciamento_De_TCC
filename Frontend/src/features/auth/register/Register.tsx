import { useEffect } from "react";
import { Button, Input, InputPassword, Label } from "@/components/ui/form";

function Register() {
  useEffect(() => {
    document.title = "FocoTCC - Registro";
  }, []);

  return (
    <>
      {/* Input Fields Section */}
      <form className="flex flex-col gap-4 font-sans font-semibold">
        <div className="flex-1">
          <Label htmlFor="Nome">Nome Completo</Label>
          <Input
            type="text"
            id="Nome"
            placeholder="Digite seu nome completo"
            autoComplete="name"
            required
            className="w-full"
          />
        </div>

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
          <Label htmlFor="cpf">Curso</Label>
          <Input
            type="text"
            id="curso"
            placeholder="Digite seu CPF"
            autoComplete="cpf"
            name="curso"
            required
            className="w-full"
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="senha">Senha</Label>
          <InputPassword
            id="senha"
            placeholder="Digite sua senha"
            autoComplete="new-password"
            name="senha"
            minLength={6}
            required
            className="w-full"
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
          <InputPassword
            id="confirmarSenha"
            placeholder="Confirme sua senha"
            autoComplete="new-password"
            name="confirmarSenha"
            minLength={6}
            required
            className="w-full"
          />
        </div>

        <Input type="hidden" name="role" value="aluno" className="hidden" />

        <Button type="submit" variant="primary" className="flex-1 mt-3">
          Criar Conta
        </Button>
      </form>
    </>
  );
}

export default Register;
