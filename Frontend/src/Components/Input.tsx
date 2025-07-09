type InputProps = {
  type: string;
  id: string;
  placeholder: string;
  name?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  minLength?: number;
};

function Input({
  type,
  id,
  placeholder,
  autoComplete,
  minLength,
  name,
}: InputProps) {
  return (
    <div className="flex flex-col mt-3 mb-2 shadow-lg  ">
      <input
        className="p-2 focus:outline-none focus:opacity-60 rounded-lg border border-solid border-gray-400 bg-[#e6e9ee] font-normal "
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required={true}
        name={name}
      />
    </div>
  );
}

export default Input;
