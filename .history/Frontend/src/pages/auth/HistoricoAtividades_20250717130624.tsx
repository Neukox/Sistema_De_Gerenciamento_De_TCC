//Layout de historico de atividades.


export function HistoricoAtividades() {
    return (
        <div className="flex items-center justify-center h-screen bg-historico">
            <div className="bg-historicoatividades w-screen h-[15%] m-[3%] rounded-2xl -mt-[35%]">
                <div>
                    <svg className="flex w-[2%] h-[2%] mt-[3%] ml-[3%]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h1 className="font-semibold text-3xl ml-[5.5%] -mt-[2%]">Histórico de Atividades</h1>

                    <div>
                        <button className="bg-red-300 ml-[90%] -mt-[2%] flex w-[7%] h-[20%]">Exportar</button>
                    </div>

                </div>

            </div>
        </div>
    )
}