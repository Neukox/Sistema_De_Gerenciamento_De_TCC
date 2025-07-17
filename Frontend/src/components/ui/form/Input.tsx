import type React from "react";
import { cn } from "@/utils/cn";

const Variants = {
  default: "focus:outline-none focus:ring-2 focus:ring-gray-300",
  primary: "focus:outline-none focus:ring-2 focus:ring-primary-500",
  secondary: "focus:outline-none focus:ring-2 focus:ring-secondary-500",
  neutral: "focus:outline-none focus:ring-2 focus:ring-neutral-500",
} as const;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: keyof typeof Variants;
  className?: string;
};

/**
 * Componente de Input Personalizado.
 * Este componente renderiza um campo de entrada HTML com estilos personalizados.
 * @param {string} [type="text"] - Tipo do campo de entrada (padrão é "text").
 * @param {string} [className] - Classes CSS adicionais para estilização.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Outras propriedades HTML do input, como `placeholder`, `value`, `onChange`, etc.
 * @return {JSX.Element} Um elemento de input estilizado com classes CSS personalizadas.
 */
function Input({
  type = "text",
  variant = "default",
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "px-3 py-2 rounded-lg border border-solid border-gray-400 bg-gray-100 font-normal transition-colors duration-1000 ease-in-out",
        Variants[variant],
        className
      )}
      type={type}
      {...props}
    />
  );
}

export default Input;
