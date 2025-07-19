import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Input, Button } from "@/components/ui/form";
import { useCreateReuniao } from "@/hooks/useCreateReuniao";
import { useTCCContext } from "@/hooks/useTCCContext";
import useTitle from "@/hooks/useTitle";

interface FormData {
  titulo: string;
  descricao: string;
  data_agendada: string;
  observacoes: string;
}

export function AgendarReuniao() {
  const navigate = useNavigate();
  const { criarReuniao, loading } = useCreateReuniao();
  const { tccData } = useTCCContext();
  
  useTitle("FocoTCC - Agendar Reunião");

  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    descricao: "",
    data_agendada: "",
    observacoes: ""
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Função para validar o formulário
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "Título é obrigatório";
    } else if (formData.titulo.length > 100) {
      newErrors.titulo = "Título deve ter no máximo 100 caracteres";
    }

    if (!formData.data_agendada) {
      newErrors.data_agendada = "Data e hora são obrigatórias";
    } else {
      const dataAgendada = new Date(formData.data_agendada);
      const agora = new Date();
      if (dataAgendada <= agora) {
        newErrors.data_agendada = "Data deve ser no futuro";
      }
    }

    if (formData.descricao && formData.descricao.length > 500) {
      newErrors.descricao = "Descrição deve ter no máximo 500 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para tratar mudanças nos inputs
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const reuniao = await criarReuniao({
      titulo: formData.titulo.trim(),
      descricao: formData.descricao.trim() || undefined,
      data_agendada: formData.data_agendada,
      observacoes: formData.observacoes.trim() || undefined
    });

    if (reuniao) {
      // Limpar formulário
      setFormData({
        titulo: "",
        descricao: "",
        data_agendada: "",
        observacoes: ""
      });
      
      // Redirecionar para o dashboard após 2 segundos
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  // Função para voltar ao dashboard
  const handleBack = () => {
    navigate("/dashboard");
  };

  // Verificar se tem TCC cadastrado
  if (!tccData?.id) {
    return (
      <div className="bg-secondary w-full min-h-screen flex justify-center items-center px-4 py-10">
        <div className="bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-xl text-center">
          <img src={logo} alt="Logo" className="w-16 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">FocoTCC</h1>
          <p className="text-lg text-gray-600 mb-6">
            Você precisa ter um TCC cadastrado para agendar reuniões.
          </p>
          <Button 
            variant="primary" 
            onClick={handleBack}
            className="mx-auto"
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-secondary w-full min-h-screen flex justify-center items-center px-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-3xl p-6 sm:p-10 shadow-xl">
        {/* Logo e título */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <img src={logo} alt="Logo" className="w-16" />
          <h1 className="text-2xl sm:text-3xl font-semibold">FocoTCC</h1>
        </div>

        {/* Título do formulário */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl  font-semibold">Agendar Nova Reunião</h2>
          <p className="text-sm sm:text-lg mt-2 sm:mt-4 text-gray-600">
            Preencha os detalhes da sua reunião
          </p>
        </div>

        {/* Formulário */}
        <form>
          {/* Título */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg  mb-1 ml-1 font-semibold" htmlFor="titulo">
              Título da Reunião
            </label>
            <Input
              id="titulo"
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Reunião de Orientação"
            />
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg  mb-1 ml-1 font-semibold" htmlFor="descricao">
              Descrição da Reunião
            </label>
            <textarea
              id="descricao"
              className="px-3 w-[100%] h-[30%] py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg border border-solid border-gray-400 bg-gray-200 font-normal"
              placeholder="Descreva o objetivo da reunião"
            ></textarea>
          </div>

          {/* Data e Hora */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <label className="block text-base sm:text-lg font-semibold mb-1 ml-1" htmlFor="data">
                Data da Reunião
              </label>
              <Input
                id="data"
                type="date"
                className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-base sm:text-lg font-semibold mb-1 ml-1" htmlFor="hora">
                Hora da Reunião
              </label>
              <Input
                id="hora"
                type="time"
                className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Participantes */}
          <div className="mb-6">
            <label className="block text-base sm:text-lg font-semibold mb-1 ml-1" htmlFor="participantes">
              Participantes
            </label>
            <Input
              id="participantes"
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Nome dos participantes"
            />
          </div>

          {/* Local/Plataforma */}
          <div className="mb-10">
            <label className="block text-base sm:text-lg font-semibold mb-1 ml-1" htmlFor="local">
              Local/Plataforma
            </label>
            <Input
              id="local"
              type="text"
              className="w-full h-10 border border-gray-300 rounded-lg px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Zoom, Google Meet, Sala 101"
            />
          </div>

         {/* Botão */}
<div className="flex justify-center md:justify-end">
  <button
    type="submit"
    className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/80 transition-colors duration-300 text-sm sm:text-base"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
    Agendar Reunião
  </button>
</div>


        </form>
      </div>
    </div>
  );
}
