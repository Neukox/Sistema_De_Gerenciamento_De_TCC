//Layout de agendamento de reuniao.
import logo from "../../assets/logo.png";


export function AgendarReuniao() {
    return (
        <div className="bg-secondary w-screen min-h-screen flex justify-center items-center px-4">
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
                    <div>
                        <label className="flex ml-10" htmlFor="Titulo da Reunião">Titulo da Reunião</label>
                    </div>
                </form>

            </div>

        </div>
    )
}