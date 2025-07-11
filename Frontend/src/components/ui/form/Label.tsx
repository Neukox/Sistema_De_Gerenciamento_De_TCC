import React from "react";
import { cn } from "@/utils/cn";

type LabelProps = {
  children?: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

/**
 * Componente de Rótulo Personalizado.
 * Este componente permite a criação de rótulos para campos de formulário com estilos personalizados.
 * @param {React.ReactNode} [children] - Conteúdo do rótulo, geralmente texto.
 * @param {React.LabelHTMLAttributes<HTMLLabelElement>} props - Outras propriedades HTML do rótulo, como `htmlFor`, `className`, etc.
 * @return {JSX.Element} Um rótulo estilizado para uso em formulários.
 */
export default function Label({ children, className, ...props }: LabelProps) {
  return (
    <label className={cn("font-bold mb-2 block", className)} {...props}>
      {children}
    </label>
  );
}
