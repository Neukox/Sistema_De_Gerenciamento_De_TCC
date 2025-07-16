//Layout de agendamento de reuniao.
import logo from "../../assets/logo.png";


export function AgendarReuniao() {
    return (
        <div className="bg-secondary w-screen min-h-screen flex justify-center items-center px-4">
            <div className="bg-white w-[35%] h-[1000px] m-10 rounded-3xl">
                <div>
                    <img src={logo} alt="Logo" className="w-32 h-32 justify-center" />
                </div>

            </div>

        </div>
    )
}