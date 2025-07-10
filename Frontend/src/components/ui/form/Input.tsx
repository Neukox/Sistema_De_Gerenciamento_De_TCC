import type React from "react";
import { cn } from "@/utils/cn"; // Ajuste o caminho conforme necessário

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

function Input({ type = "text", className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal",
        className
      )}
      type={type}
      {...props}
    />
  );
}

export default Input;
