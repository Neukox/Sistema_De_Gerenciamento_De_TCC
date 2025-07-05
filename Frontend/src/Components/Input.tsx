type InputProps = {
    type: string;
    id: string;
    placeholder: string;
    required?: boolean;
    className?: string;
    autocomplete?: string;
    minLength?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({type, id, placeholder, autocomplete, minLength, value, onChange} : InputProps) {
   
    return (
      <div className="flex flex-col mt-3 mb-2 shadow-lg  ">
        <input 
          className="p-2 focus:outline-none focus:opacity-80 rounded-lg border border-solid border-gray-400 bg-[#f9fafc] font-normal " 
          type={type}
          id={id}
          placeholder={placeholder}
          autoComplete={autocomplete}
          minLength={minLength}
          required={true}
          value={value}
          onChange={onChange}
         />
      </div>
  
    );

}

export default Input; 