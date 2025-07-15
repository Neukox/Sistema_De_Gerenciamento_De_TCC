import logo from '../../assets/logo.png';

export function ConfirmResetPassword() {
    return (
        <div className='bg-[#F3C50D] w-screen h-screen flex justify-center items-center'>
            <div className='bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg'>
                <div className='flex justify-center mb-4'>
                    <img src={logo} className='w-[60px] h-20' alt="Logo do Sistema" />
                </div>

                {/* Aqui você pode colocar os campos do formulário */}
                <h2 className="text-center text-xl font-bold mb-4">Redefinir Senha</h2>
                <form className="flex flex-col gap-4">
                    <input 
                        type="password" 
                        placeholder="Nova senha" 
                        className="border rounded p-2"
                    />
                    <input 
                        type="password" 
                        placeholder="Confirmar senha" 
                        className="border rounded p-2"
                    />
                    <button className="bg-[#F3C50D] text-white font-bold py-2 rounded hover:bg-yellow-500 transition">
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
}
