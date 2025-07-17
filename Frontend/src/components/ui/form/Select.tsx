import { cn } from "@/utils/cn";
import React from "react";

const Variants = {
  default: "focus:ring-2 focus:ring-gray-300",
  primary: "focus:ring-2 focus:ring-primary-500",
  secondary: "focus:ring-2 focus:ring-secondary-500",
  neutral: "focus:ring-2 focus:ring-neutral-500",
} as const;

export type SelectProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  variant?: keyof typeof Variants;
  className?: string;
};

/**
 * Componente de Select Personalizado.
 * Este componente renderiza um campo de seleção HTML com estilos personalizados.
 * @param {string} [className] - Classes CSS adicionais para estilização.
 * @param {React.InputHTMLAttributes<HTMLSelectElement>} props - Outras propriedades HTML do select, como `placeholder`, `value`, `onChange`, etc.
 * @return {JSX.Element} Um elemento de select estilizado com classes CSS personalizadas.
 */
export default function Select({
  variant = "default",
  className,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        "px-3 py-2 rounded-lg border border-solid border-gray-400 bg-gray-100 font-normal transition-colors duration-1000 ease-in-out focus:outline-none",
        Variants[variant],
        className
      )}
      {...props}
    >
      {props.children}
    </select>
  );
}
