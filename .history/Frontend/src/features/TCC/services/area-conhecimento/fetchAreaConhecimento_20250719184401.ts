// Serviço mock para buscar áreas de conhecimento
export async function fetchAreasConhecimento() {
  return [
    { id: 1, nome: "Ciências Humanas" },
    { id: 2, nome: "Ciências Exatas" },
    { id: 3, nome: "Ciências Biológicas" },
  ];
}
