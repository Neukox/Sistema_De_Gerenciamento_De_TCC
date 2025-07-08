type ButtonProps = {
    type: void | 'button' | 'submit' | 'reset';
    bgColor?: string;
    width?: string;
    height?: string;
    children?: React.ReactNode;
}

function Button ({type = 'button', bgColor = 'bg-blue-500', children, width, height} : ButtonProps) {
    return (
          <button type={type}
          className={`px-4 py-2 rounded-lg text-white font-semibold hover:opacity-95 hover:translate-y-1 transition-transform  duration-300 ${width} ${height} ${bgColor}`}>{children}
          </button>
          
    );
}

export default Button;