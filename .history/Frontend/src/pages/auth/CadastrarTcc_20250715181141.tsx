import { useState, useEffect } from 'react';
import Label from '@/components/ui/form/Label';
import { Input } from '@/components/ui/form';
import { Button } from '@/components/ui/form';
import logo from '../../assets/logo.png';
import { useCadastrarTCC } from '@/hooks/useCadastrarTCC';
import { getProfessores, getAreasConhecimento } from '@/services/fetchProfessoresAreas';
import type { Professor, AreaConhecimento } from '@/services/fetchProfessoresAreas';

export function CadastrarTcc() {
  const { cadastrarTCC, loading } = useCadastrarTCC();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [areasConhecimento, setAreasConhecimento] = useState<AreaConhecimento[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Estado do formulário
  const [formData, setFormData] = useState({
    titulo: '',
    tema: '',
    resumo: '',
    dataInicio: '',
    dataConclusao: '',
    statusAtual: '',
    areaConhecimentoId: '',
    orientadorId: '',
    coorientadorId: '',
  });

  // Carregar professores e áreas de conhecimento
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoadingData(true);
        const [professoresData, areasData] = await Promise.all([
          getProfessores(),
          getAreasConhecimento(),
        ]);
        setProfessores(professoresData);
        setAreasConhecimento(areasData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoadingData(false);
      }
    };

    carregarDados();
  }, []);

  // Função para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.titulo || !formData.tema || !formData.resumo || !formData.statusAtual || !formData.areaConhecimentoId || !formData.orientadorId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    await cadastrarTCC(formData);
  };

  if (loadingData) {
    return (
      <div className="bg-secondary w-full min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-secondary w-full min-h-screen flex justify-center items-start overflow-x-hidden px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md sm:max-w-lg lg:max-w-xl my-4 sm:my-6 lg:my-10 py-6 sm:py-8 lg:py-10 rounded-2xl shadow-lg">

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 px-4">
          <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center">FocoTCC</h1>
        </div>

        <div className="px-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center mt-4 sm:mt-5 font-bold">Cadastrar TCC</h1>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-3 sm:mt-5 text-gray-600 mb-5 font-semibold">
            Registre seu trabalho de conclusão de curso!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="titulo">
                Título do TCC *
              </Label>
              <Input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                className="w-full h-12"
                placeholder="Digite o título do seu TCC"
                required
              />
            </div>

            {/* Tema do TCC */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="tema">
                Tema do TCC *
              </Label>
              <Input
                type="text"
                id="tema"
                name="tema"
                value={formData.tema}
                onChange={handleInputChange}
                className="w-full h-12"
                placeholder="Digite o tema do seu TCC"
                required
              />
            </div>

            {/* Área do conhecimento */}
            <div>
              <Label
                htmlFor="areaConhecimentoId"
                className="block text-sm sm:text-base font-medium mb-2"
              >
                Área do Conhecimento *
              </Label>
              <select
                id="areaConhecimentoId"
                name="areaConhecimentoId"
                value={formData.areaConhecimentoId}
                onChange={handleInputChange}
                className="w-full h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
                required
              >
                <option value="">Selecione uma área</option>
                {areasConhecimento.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Orientador */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="orientadorId">
                Orientador *
              </Label>
              <select
                id="orientadorId"
                name="orientadorId"
                value={formData.orientadorId}
                onChange={handleInputChange}
                className="w-full h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
                required
              >
                <option value="">Selecione um orientador</option>
                {professores.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.nome} - {professor.area_atuacao}
                  </option>
                ))}
              </select>
            </div>

            {/* Coorientador */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="coorientadorId">
                Coorientador (Opcional)
              </Label>
              <select
                id="coorientadorId"
                name="coorientadorId"
                value={formData.coorientadorId}
                onChange={handleInputChange}
                className="w-full h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
              >
                <option value="">Selecione um coorientador (opcional)</option>
                {professores.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.nome} - {professor.area_atuacao}
                  </option>
                ))}
              </select>
            </div>

            {/* Resumo do TCC */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="resumo">
                Resumo/Descrição *
              </Label>
              <textarea
                id="resumo"
                name="resumo"
                value={formData.resumo}
                onChange={handleInputChange}
                className="w-full h-32 sm:h-36 lg:h-40 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite um resumo ou descrição do seu TCC"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Datas - Layout responsivo lado a lado em telas maiores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Data de Início */}
              <div>
                <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="dataInicio">
                  Data de início
                </Label>
                <Input
                  type="date"
                  id="dataInicio"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  className="w-full h-12"
                />
              </div>

              {/* Data de Conclusão */}
              <div>
                <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="dataConclusao">
                  Data de conclusão
                </Label>
                <Input
                  type="date"
                  id="dataConclusao"
                  name="dataConclusao"
                  value={formData.dataConclusao}
                  onChange={handleInputChange}
                  className="w-full h-12"
                />
              </div>
            </div>

            {/* Status Atual */}
            <div>
              <Label className="block text-sm sm:text-base font-medium mb-2" htmlFor="statusAtual">
                Status Atual *
              </Label>
              <select
                id="statusAtual"
                name="statusAtual"
                value={formData.statusAtual}
                onChange={handleInputChange}
                className="w-full h-12 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
                required
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
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Cadastrando...
                  </span>
                ) : (
                  'Cadastrar TCC'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
