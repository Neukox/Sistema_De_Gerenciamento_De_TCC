type ButtonProps = {
    type?: 'button' | 'submit' | 'reset';
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
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg text-white font-semibold hover:opacity-95 hover:translate-y-1 transition-transform duration-300 ${width} ${height} ${bgColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {children}
          </button>
          
    );
}

export default Button;