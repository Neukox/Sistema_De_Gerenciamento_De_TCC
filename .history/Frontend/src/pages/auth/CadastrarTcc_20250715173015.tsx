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

        <form action="" className="px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="titulo-do-tcc">
                Título do TCC
              </Label>
              <Input
                type="text"
                id="titulo-do-tcc"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o título do seu TCC"
              />
            </div>

            {/* Tema do TCC */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="tema-do-tcc">
                Tema do TCC
              </Label>
              <Input
                type="text"
                id="tema-do-tcc"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o tema do seu TCC"
              />
            </div>

            {/* Área do conhecimento */}
            <div>
              <Label
                htmlFor="area-do-conhecimento"
                className="block text-sm sm:text-base font-medium mb-2"
              >
                Área do Conhecimento
              </Label>
              <select
                id="area-do-conhecimento"
                name="areaDoConhecimento"
                className="w-full h-12 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione uma área</option>
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
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="curso">
                Curso
              </Label>
              <Input
                type="text"
                id="curso"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome do seu curso"
              />
            </div>

            {/* Orientador */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="orientador">
                Orientador
              </Label>
              <Input
                type="text"
                id="orientador"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome do seu orientador"
              />
            </div>

            {/* Coorientador */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="coorientador">
                Coorientador
              </Label>
              <Input
                type="text"
                id="coorientador"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome do seu coorientador (opcional)"
              />
            </div>

            {/* Resumo do TCC */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="resumo">
                Resumo/Descrição
              </Label>
              <textarea
                id="resumo"
                className="w-full h-32 sm:h-36 lg:h-40 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite um resumo ou descrição do seu TCC"
                rows={4}
              ></textarea>
            </div>

            {/* Datas - Layout responsivo lado a lado em telas maiores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Data de Início */}
              <div>
                <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="data-inicio">
                  Data de início
                </Label>
                <Input
                  type="date"
                  id="data-inicio"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Data de Conclusão */}
              <div>
                <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="data-conclusao">
                  Data de conclusão
                </Label>
                <Input
                  type="date"
                  id="data-conclusao"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Atual */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="status-atual">
                Status Atual
              </Label>
              <select
                id="status-atual"
                name="statusAtual"
                className="w-full h-12 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione o status</option>
                <option value="PLANEJAMENTO">Planejamento</option>
                <option value="DESENVOLVIMENTO">Desenvolvimento</option>
                <option value="REVISAO">Revisão</option>
                <option value="FINALIZACAO">Finalização</option>
                <option value="CONCLUIDO">Concluído</option>
              </select>
            </div>

            {/* Botão de Cadastrar TCC */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105"
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
