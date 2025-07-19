//Layout de agendamento de reuniao.
import logo from "../../assets/logo.png";


export function AgendarReuniao() {
    return (
        <div className="bg-secondary w-screen min-h-screen flex justify-center items-center px-4 ">
            <div className="bg-white w-[35%] h-[1000px] m-10 rounded-3xl">
                <div className=" justify-center flex">
                    <img src={logo} alt="Logo" className="w-[15%]" />
                    <h1 className="flex text-3xl mt-[9%]">FocoTCC</h1>
                </div>
                <div>
                     <h1 className="flex text-4xl mt-[5%] justify-center ">Agendar Nova Reunião</h1>
                     <p className="text-1xl flex justify-center mt-10">Preencha os detalhes da sua reunião</p>
                </div>

                {/* Formulário de agendamento de reunião */}
                <form action="">

                    {/* Titulo da reuniao. */}
                    <div>
                        <label className="flex ml-10 mt-[10%] text-1xl" htmlFor="Titulo da Reunião">Titulo da Reunião</label>
                        <input
                            type="text"
                            className="w-[80%] h-10 ml-10 mt-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ex: Reunião de Orientação"
                        />
                    </div>
                    {/* Descrição da reuniao. */}

                    <div>
                        <label className="flex ml-10 mt-[10%] text-1xl" htmlFor="Descrição da reuniao">Descrição da Reunião</label>
                        <textarea
                            className="w-[80%] h-20 ml-10 mt-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Descreva o objetivo da reunião"
                        ></textarea>
                    </div>

                    {/* Data e hora da reunião */}
                    <div className="flex flex-col items-start">
                        <label className="flex ml-10 mt-[10%] text-1xl" htmlFor="Data da reuniao">Data da Reunião</label>
                        <input
                            type="date"
                            className="w-[40%] h-10 ml-10 mt-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Selecione a data"
                        />

                        <label className="flex ml-[50%] -mt-[12%]" htmlFor="Hora da reuniao">Hora da Reunião</label>
                        <input
                            type="time"
                            className="w-[40%] h-10 ml-[50%] mt-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Selecione a hora"
                        />
                    </div>

                    {/* Participantes */}

                    <div>
                        <label className="flex ml-10 mt-[10%]" htmlFor="Participantes">Participantes</label>
                        <input
                            type="text"
                            className="w-[80%] h-10 ml-10 mt-2 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ex: Nomes do participantes"
                        />
                    </div>
                    
                </form>

            </div>

        </div>
    )
}