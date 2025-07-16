//Layout de agendamento de reuniao.
import logo from "../../assets/logo.png";


export function AgendarReuniao() {
    return (
        <div className="bg-secondary w-screen min-h-screen flex justify-center items-center px-4">
            <div className="bg-white w-[35%] h-[1000px] m-10 rounded-3xl">
                <div>
                    <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 mr-3" />
                </div>

            </div>

        </div>
    )
}