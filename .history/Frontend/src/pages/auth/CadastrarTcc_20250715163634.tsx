import logo from '../../assets/logo.png';

export function CadastrarTcc() {
  return (
    <div className="bg-secondary w-screen flex justify-center items-start h-[2000px]">
      <div className="bg-white w-[500px] h-[1500px] mt-10 rounded-2xl">

        <div className="flex justify-center items-center mt-10">
          <img src={logo} alt="Logo" className="w-51 h-32" />
          <h1 className="text-3xl">FocoTCC</h1>
        </div>

        <div>
          <h1 className="text-4xl justify-center flex mt-5">Cadastrar TCC</h1>
          <p className="text-1xl flex justify-center mt-5">
            Registre seu trabalho de conclusão de curso!
          </p>
        </div>

        {/* Formulário de cadastro de TCC */}
        <div>
          <form action="">
            <div>
              <label className="flex ml-10 mt-20" htmlFor="titulo-do-tcc">
                Título do TCC
              </label>
              <input
                type="text"
                id="titulo-do-tcc"
                className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                placeholder="Digite o título do seu TCC"
              />

              {/* Tema do TCC */}
              <div>
                <label className="flex ml-10 mt-10" htmlFor="tema-do-tcc">
                  Tema do TCC
                </label>
                <input
                  type="text"
                  id="tema-do-tcc"
                  className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                  placeholder="Digite o tema do seu TCC"
                />
              </div>

              {/* Área do conhecimento */}
              <div>
                <label
                  htmlFor="area-do-conhecimento"
                  className="block mb-1 ml-10 mt-10"
                >
                  Área do Conhecimento
                </label>
                <select
                  id="area-do-conhecimento"
                  name="areaDoConhecimento"
                  className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                >
                  <option value="CIENCIAS_HUMANAS">Ciências Humanas</option>
                  <option value="CIENCIAS_EXATAS">Ciências Exatas</option>
                  <option value="CIENCIAS_BIOLOGICAS">Ciências Biológicas</option>
                  <option value="ENGENHARIAS">Engenharias</option>
                  <option value="CIENCIAS_SOCIAIS">Ciências Sociais</option>
                  <option value="CIENCIAS_AGRARIAS">Ciências Agrárias</option>
                  <option value="LINGUISTICA">Linguística</option>
                  <option value="TECNOLOGIA">Tecnologia</option>
                  <option value="ARTES">Artes</option>
                  <option value="SAUDE">Saúde</option>
                  <option value="OUTROS">Outros</option>
                </select>
              </div>

              {/* Curso */}
              <div>
                <label className="flex ml-10 mt-10" htmlFor="Curso">
                  Curso
                </label>
                <input
                  type="text"
                  id="curso"
                  className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                  placeholder="Digite o nome do seu curso"
                />
              </div>

              {/* Orientador */}
              <div>
                <label className="flex ml-10 mt-10" htmlFor="orientador">
                  Orientador
                </label>
                <input
                  type="text"
                  id="orientador"
                  className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                  placeholder="Digite o nome do seu orientador"
                />
              </div>

              {/* Coorientador */}
              <div>
                <label className="flex ml-10 mt-10" htmlFor="coorientador">
                  Coorientador
                </label>
                <input
                  type="text"
                  id="coorientador"
                  className="border-2 border-gray-300 rounded-lg w-[400px] h-[50px] ml-10 mt-2 px-3"
                  placeholder="Digite o nome do seu coorientador (opcional)"
                />
              </div>

                {/* Resumo do TCC */}
                <div>
                    <label className='flex ml-10 mt-10' htmlFor="Resumo">Resumo/Descrição</label>
                    <textarea
                        id="resumo"
                        className="border-2 border-gray-300 rounded-lg w-[400px] h-[100px] ml-10 mt-2 px-3"
                        placeholder="Digite um resumo ou descrição do seu TCC"
                        rows={4}
                    ></textarea>
                </div>

                {/* Data de Inicio */}
                <div>
                    <label className='flex mt-10 ml-10' htmlFor="Data de inicio">Data de início</label>
                    
                </div>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
