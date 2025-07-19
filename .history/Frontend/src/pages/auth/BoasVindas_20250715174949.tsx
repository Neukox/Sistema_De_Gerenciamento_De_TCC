import { Button } from '@/components/ui/form';
import logo from '../../assets/logo.png';

export function BoasVindas() {
  return (
    <div className="bg-secondary w-full min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-4xl mx-auto py-8 sm:py-12 lg:py-16 px-6 sm:px-8 lg:px-12 rounded-2xl shadow-lg">
        
        {/* Header com Logo */}
        <div className="flex justify-center items-center mb-8 sm:mb-12">
          <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 mr-3" />
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
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-full"></div>
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
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
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
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
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
              className="px-8 py-3 text-base sm:text-lg font-semibold inline-flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Cadastrar Meu TCC
            </Button>
          </div>

          {/* Link para Login */}
          <p className="text-sm sm:text-base text-gray-600">
            Já tem um TCC cadastrado?{' '}
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors"
            >
              Fazer Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
