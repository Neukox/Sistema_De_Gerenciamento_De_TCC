import logo from '../../assets/logo.png';

export function ConfirmResetPassword() {
    return (
        <div className='bg-[#F3C50D] w-screen h-screen flex justify-center items-center'>
            <div className='bg-white w-[500px] h-[600px] max-w-md h-auto p-6 rounded-xl shadow-lg flex flex-col items-center'>
                <div>
                    <img src={logo} className='w-[60px] h-20 mb-4' alt="Logo do Sistema" />
                </div>
                {/* Conteúdo do formulário vai aqui */}
            </div>
        </div>
    );
}
