// Serviço mock para buscar TCC por id
export async function fetchTCCById(id) {
  // Simulação: retorna um objeto TCC básico
  return {
    id,
    titulo: "Título Exemplo",
    tema: "Tema Exemplo",
    areaConhecimento: "Ciências Humanas",
    curso: "Administração",
    orientadorNome: "Prof. Orientador",
    coorientadorNome: "Prof. Coorientador",
    resumo: "Resumo do TCC...",
    dataInicio: "2025-01-01",
    dataConclusao: "2025-12-31",
    statusAtual: "Desenvolvimento",
  };
}
