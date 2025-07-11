type ButtonProps = {
    type: void | 'button' | 'submit' | 'reset';
    bgColor?: string;
    width?: string;
    height?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

function Button ({type = 'button', bgColor = 'bg-blue-500', children, width, height, disabled = false, onClick} : ButtonProps) {
    return (
          <button 
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-white font-semibold transition-transform duration-300 ${width} ${height} ${bgColor} ${
              disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:opacity-95 hover:translate-y-1'
            }`}
          >
            {children}
          </button>
          
    );
}

export default Button;