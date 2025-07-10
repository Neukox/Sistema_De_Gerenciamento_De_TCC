import type React from "react";
import { cn } from "../../../utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({ type = "text", ...props }: InputProps) {
  return (
    <input
      className={cn(
        "px-3 py-2 focus:outline-none focus:opacity-60 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
      )}
      type={type}
      {...props}
    />
  );
}

export default Input;
