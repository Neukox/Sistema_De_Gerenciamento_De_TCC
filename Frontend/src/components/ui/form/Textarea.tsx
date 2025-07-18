import React from "react";
import { cn } from "@/utils/cn";

const Variants = {
  default: "focus:ring-2 focus:ring-gray-300",
  primary: "focus:ring-2 focus:ring-primary-500",
  secondary: "focus:ring-2 focus:ring-secondary-500",
  neutral: "focus:ring-2 focus:ring-neutral-500",
} as const;

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant?: keyof typeof Variants;
    className?: string;
  };

/**
 * Componente de Textarea Personalizado.
 * Este componente renderiza uma área de texto HTML com estilos personalizados.
 * @param {string} [className] - Classes CSS adicionais para estilização.
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props - Outras propriedades HTML do textarea, como `placeholder`, `value`, `onChange`, etc.
 * @return {JSX.Element} Um elemento de textarea estilizado com classes CSS personalizadas.
 */

export default function Textarea({
  variant = "default",
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        "px-3 py-2 rounded-lg border border-solid border-gray-400 bg-gray-100 font-normal transition-colors duration-300 ease-in-out focus:outline-none resize-none",
        Variants[variant],
        className
      )}
      {...props}
    />
  );
}
