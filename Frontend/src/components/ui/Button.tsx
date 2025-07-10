import React from "react";
import { cn } from "@/utils/cn"; // Ajuste o caminho conforme necessário

type Variants = {
  default: string;
  primary: string;
  secondary: string;
  neutral: string;
};

// Define as variantes de estilo para o botão
const variants: Variants = {
  default: "text-black border border-gray-300 hover:bg-gray-100",
  primary: "bg-primary hover:bg-primary/80 text-white",
  secondary: "bg-secondary hover:bg-secondary/80 text-white",
  neutral: "bg-neutral hover:bg-neutral/80 text-white",
};

type ButtonProps = {
  variant?: keyof Variants;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Componente de Botão Personalizado.
 * Este componente permite a criação de botões com diferentes variantes de estilo.
 * @param {keyof Variants} [variant] - Define o estilo do botão. Opções: "default", "primary", "secondary", "neutral".
 * @param {string} [className] - Classe CSS adicional para personalização.
 * @param {React.ReactNode} [children] - Conteúdo do botão, geralmente texto ou ícones.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Outras propriedades HTML do botão, como `onClick`, `disabled`, etc.
 * @return {JSX.Element} Um botão estilizado com base na variante selecionada.
 */

function Button({
  variant = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg text-black font-semibold hover:translate-y-1 transition-transform duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
