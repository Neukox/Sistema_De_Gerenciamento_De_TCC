import Input from "@/components/ui/form/Input";
import { Eye, EyeOff } from "lucide-react";
import { useTogglePassword } from "@/hooks/useTogglepassword";
import { cn } from "@/utils/cn";

export default function InputPassword({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { mostrarSenha, toggleSenha } = useTogglePassword();

  return (
    <div className="relative min-w-fit flex">
      <Input
        type={mostrarSenha ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={toggleSenha}
        className="absolute inset-y-0 right-0 flex items-center pr-2"
      >
        {mostrarSenha ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}
