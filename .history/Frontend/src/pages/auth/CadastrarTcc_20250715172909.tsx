import Label from '@/components/ui/form/Label';
import { Input } from '@/components/ui/form';
import { Button } from '@/components/ui/form';
import logo from '../../assets/logo.png';

export function CadastrarTcc() {
  return (
    <div className="bg-secondary w-full min-h-screen flex justify-center items-start overflow-x-hidden px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md sm:max-w-lg lg:max-w-xl my-4 sm:my-6 lg:my-10 py-6 sm:py-8 lg:py-10 rounded-2xl shadow-lg">

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 px-4">
          <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">FocoTCC</h1>
        </div>

        <div className="px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center mt-4 sm:mt-5 font-bold">Cadastrar TCC</h1>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-3 sm:mt-5 text-gray-600">
            Registre seu trabalho de conclusão de curso!
          </p>
        </div>

        <form action="">
          <div>
            <Label className="flex ml-10 mt-20" htmlFor="titulo-do-tcc">
              Título do TCC
            </Label>
            <Input
              type="text"
              id="titulo-do-tcc"
              className="border-2 w-[400px] ml-10 mt-2 px-3"
              placeholder="Digite o título do seu TCC"
            />

            {/* Tema do TCC */}
            <div>
              <Label className="flex ml-10 mt-10" htmlFor="tema-do-tcc">
                Tema do TCC
              </Label>
              <Input
                type="text"
                id="tema-do-tcc"
                className="border-2 w-[400px] ml-10 mt-2 px-3"
                placeholder="Digite o tema do seu TCC"
              />
            </div>

            {/* Área do conhecimento */}
            <div>
              <Label
                htmlFor="area-do-conhecimento"
                className="block mb-1 ml-10 mt-10"
              >
                Área do Conhecimento
              </Label>
              <select
                id="area-do-conhecimento"
                name="areaDoConhecimento"
                className="w-[400px] h-[50px] ml-10 mt-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
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
              <Label className="flex ml-10 mt-10" htmlFor="Curso">
                Curso
              </Label>
              <Input
                type="text"
                id="curso"
                className="border-2 w-[400px] ml-10 mt-2 px-3"
                placeholder="Digite o nome do seu curso"
              />
            </div>

            {/* Orientador */}
            <div>
              <Label className="flex ml-10 mt-10" htmlFor="orientador">
                Orientador
              </Label>
              <Input
                type="text"
                id="orientador"
                className="border-2 w-[400px] ml-10 mt-2 px-3"
                placeholder="Digite o nome do seu orientador"
              />
            </div>

            {/* Coorientador */}
            <div>
              <Label className="flex ml-10 mt-10" htmlFor="coorientador">
                Coorientador
              </Label>
              <Input
                type="text"
                id="coorientador"
                className="border-2 w-[400px] ml-10 mt-2 px-3"
                placeholder="Digite o nome do seu coorientador (opcional)"
              />
            </div>

            {/* Resumo do TCC */}
            <div>
              <Label className="flex ml-10 mt-10" htmlFor="Resumo">
                Resumo/Descrição
              </Label>
              <textarea
                id="resumo"
                className="w-[400px] h-[150px] ml-10 mt-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
                placeholder="Digite um resumo ou descrição do seu TCC"
                rows={4}
              ></textarea>
            </div>

            {/* Data de Início */}
            <div>
              <Label className="flex mt-10 ml-10" htmlFor="Data de inicio">
                Data de início
              </Label>
              <Input
                type="date"
                id="data-inicio"
                className="border-2 w-[400px] ml-10 mt-2 px-3"
              />
            </div>

            {/* Data de Conclusão */}
            <div>
              <Label className="flex mt-10 ml-10" htmlFor="Data de conclusão">
                Data de conclusão
              </Label>
              <Input
                type="date"
                id="data-conclusao"
                className="border-2 w-[400px] ml-10 mt-2 px-3"
              />
            </div>

            {/* Status Atual */}
            <div>
              <Label className="flex mt-10 ml-10" htmlFor="Status atual">
                Status Atual
              </Label>
              <select
                id="status-atual"
                name="statusAtual"
                className="w-[400px] h-[50px] ml-10 mt-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
              >
                <option value="Planejamento">Planejamento</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Revisao">Revisão</option>
                <option value="Finalizacao">Finalização</option>
                <option value="Concluido">Concluído</option>
              </select>
            </div>

            {/* Botão de Cadastrar TCC */}
            <div className="flex justify-center mt-10">
              <Button
                type="submit"
                variant="primary"
                className="w-[400px]"
              >
                Cadastrar TCC
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
