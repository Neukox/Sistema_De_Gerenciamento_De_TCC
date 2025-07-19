import { Button } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { LuTarget } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdTrendingUp } from "react-icons/io";


export function BoasVindas() {
  const navigate = useNavigate();

  const handleCadastrarTCC = () => {
    navigate('/cadastrar-tcc');
  };

  const handleFazerLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-secondary w-full min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-4xl mx-auto py-8 sm:py-12 lg:py-16 px-6 sm:px-8 mb-6 mt-6 lg:px-12 rounded-2xl shadow-lg">
        
        {/* Header com Logo */}
        <div className="flex justify-center items-center mb-8 sm:mb-12">
          <img src={logo} alt="Logo" className="w-24 h-24 sm:w-16 sm:h-16 object-contain " />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">FocoTCC</h1>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Bem-vindo ao FocoTCC!
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Organize e acompanhe o progresso do seu Trabalho de Conclusão de 
            Curso de forma eficiente
          </p>
        </div>

        {/* Cards de Recursos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Card 1: Organize Marcos */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 flex items-center justify-center"> <LuTarget size={35} className='flex text-blue-600 items-center' />
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              Organize Marcos
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Defina e acompanhe os principais marcos do seu TCC
            </p>
          </div>

          {/* Card 2: Gerencie Tarefas */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoMdCheckmarkCircleOutline size={35} className='flex text-green-800 items-center' />

            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              Gerencie Tarefas
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Controle suas atividades e prazos importantes
            </p>
          </div>

          {/* Card 3: Monitore Progresso */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoMdTrendingUp size={35} className='flex items-center text-orange-800' />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              Monitore Progresso
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Visualize seu progresso com gráficos e relatórios
            </p>
          </div>
        </div>

        {/* Seção Call-to-Action */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Pronto para começar?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cadastre seu TCC para começar a organizar e acompanhar seu progresso de 
            forma eficiente. Nossa plataforma vai te ajudar a manter o foco e cumprir 
            todos os prazos.
          </p>
          
          {/* Botão Principal */}
          <div className="mb-6">
            <Button
              variant="primary"
              onClick={handleCadastrarTCC}
              className="px-8 py-3 text-base sm:text-lg font-semibold inline-flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Cadastrar Meu TCC
            </Button>
          </div>

          {/* Link para Login */}
          <p className="text-sm sm:text-base font-semibold text-gray-600">
            Já tem um TCC cadastrado?{' '}
            <button 
              onClick={handleFazerLogin}
              className="text-primary hover:opacity-85 font-semibold outline-none transition-colors bg-transparent border-none cursor-pointer"
            >
              Fazer Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
