import logo from '../../assets/logo.png';

export function ConfirmResetPassword() {
    return (
        <div className='bg-[#F3C50D] w-screen h-screen flex justify-center items-center'>
            <div className='bg-white w-[500px] h-[600px] max-w-md h-auto p-6 rounded-xl shadow-lg flex flex-col items-center'>
                <div className='flex-col'>
                    <img src={logo} className='w-[60px] h-20 mb-4' alt="Logo do Sistema" />
                </div>
                <div>
                    <h1 className='text-3xl -mt-5'>FocoTCC</h1>
                </div>
                <div>
                    <h1 className='text-4xl mt-6'>Definir Nova Senha</h1>
                </div>
                <div>
                    <p className='text-sm mt-8'>Insira sua nova senha para acessar sua conta.</p>
                </div>
                {/* Conteúdo do formulário vai aqui */}
                <div>
                    <form action="">
                        <div>
                            <p>Ema</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
