import logo from '../../assets/logo.png';

export function CadastrarTcc() {
    return (
        <div className="bg-secondary h-screen w-screen flex justify-center items-start">
            <div className="bg-white w-[500px] h-[1500px] mt-10 rounded-2xl">

                <div className="flex justify-center items-center mt-10">
                    <img src={logo} alt="Logo" className="w-51 h-32"></img>
                    <h1 className='text-3xl'>FocoTCC</h1>
                </div>
                <div>
                    <h1 className='text-4xl justify-center flex mt-5'>Cadastrar TCC</h1>
                    <p className='text-1xl flex justify-center mt-5'>Registre seu trabalho de conclusão de curso!</p>
                </div>


                {/* Formulário de cadastro de TCC */}
                <div>
                    <form action="">
                        <div>
                            <label  className="flex ml-10 mt-20"htmlFor="Titulo do TCC">Titulo do TCC</label>
                            <input
                                type="text"
                                className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                                placeholder="Digite o título do seu TCC"
                            />

                            {/*Tema do TCC*/}
                            <div>
                                <label className="flex ml-10 mt-10" htmlFor="Tema do TCC">Tema do TCC</label>
                                <input
                                    type="text"
                                    className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                                    placeholder="Digite o tema do seu TCC"
                                />
                            </div>

                            {/** */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
