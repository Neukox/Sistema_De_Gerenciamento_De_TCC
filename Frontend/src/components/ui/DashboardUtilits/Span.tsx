import React from "react";
import { cn } from "@/utils/cn"; // Ajuste o caminho conforme necessário

type Variants = {
    primary: string;
};

const variants: Variants = {
   primary: "font-medium text-[#252525] hover:text-gray-400 cursor-pointer",

};

type SpanProps = {
    variant?: keyof Variants;
    className?: string;
    children?: React.ReactNode;

}


/**
 * Componente de Span Personalizado.
 * Usado para estilizar textos clicáveis com variantes de estilo.
 *
 * @param {keyof Variants} [variant="primary"] - Define o estilo visual aplicado ao span.
 * @param {string} [className] - Classe CSS adicional opcional para customizações extras.
 * @param {React.ReactNode} [children] - Conteúdo interno do span (geralmente texto ou ícones).
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - Outras propriedades nativas do elemento <span>.
 *
 * @returns {JSX.Element} Um elemento <span> estilizado com base na variante selecionada.
 */



function Span ({
    variant = "primary",
    className,
    children,
    ...props
}: SpanProps) {
    return (
        <span className={cn("font-medium text-[#252525] hover:text-gray-400 cursor-pointer",
            variants[variant], 
            className,
        )}
        {...props}
        >
            {children}
        </span>
    )
}
export default Span;