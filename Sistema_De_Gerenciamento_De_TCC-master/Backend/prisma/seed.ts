import { $Enums, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

type AreasConhecimento = Record<$Enums.CategoriasAreasConhecimento, string[]>;

const areasConhecimento: AreasConhecimento = {
  CIENCIAS_EXATAS: [
    "Matemática",
    "Probabilidade e Estatística",
    "Ciência da Computação",
    "Astronomia",
    "Física",
    "Química",
    "Geociências",
    "Oceanografia",
  ],
  CIENCIAS_HUMANAS: [
    "Filosofia",
    "Sociologia",
    "Antropologia",
    "Arqueologia",
    "História",
    "Geografia",
    "Psicologia",
    "Educação",
    "Ciência Política",
    "Teologia",
  ],
  CIENCIAS_BIOLOGICAS: [
    "Biologia Geral",
    "Genética",
    "Botânica",
    "Zoologia",
    "Ecologia",
    "Morfologia",
    "Fisiologia",
    "Bioquímica",
    "Biofísica",
    "Farmacologia",
    "Imunologia",
    "Microbiologia",
    "Parasitologia",
    "Biotecnologia",
  ],
  ENGENHARIAS: [
    "Engenharia Civil",
    "Engenharia de Minas",
    "Engenharia de Materiais e Metalúrgica",
    "Engenharia Elétrica",
    "Engenharia Mecânica",
    "Engenharia Química",
    "Engenharia Sanitária",
    "Engenharia de Produção",
    "Engenharia Nuclear",
    "Engenharia de Transportes",
    "Engenharia Naval e Oceânica",
    "Engenharia Aeroespacial",
    "Engenharia Biomédica",
    "Engenharia de Software",
    "Engenharia de Controle e Automação",
    "Engenharia Ambiental",
    "Engenharia de Alimentos",
    "Engenharia Florestal",
    "Engenharia Agrícola",
    "Engenharia de Pesca",
    "Engenharia Cartográfica",
    "Engenharia Textil",
    "Engenharia de Petróleo",
    "Engenharia de Telecomunicações",
  ],
  SAUDE: [
    "Medicina",
    "Odontologia",
    "Farmácia",
    "Enfermagem",
    "Nutrição",
    "Saúde Coletiva",
    "Fonoaudiologia",
    "Fisioterapia e Terapia Ocupacional",
    "Educação Física",
    "Medicina Veterinária",
    "Psicologia",
    "Biomedicina",
    "Radiologia",
    "Terapia Ocupacional",
  ],
  CIENCIAS_AGRARIAS: [
    "Agronomia",
    "Recursos Florestais e Engenharia Florestal",
    "Engenharia Agrícola",
    "Zootecnia",
    "Medicina Veterinária",
    "Recursos Pesqueiros e Engenharia de Pesca",
    "Ciência e Tecnologia de Alimentos",
  ],
  CIENCIAS_SOCIAIS: [
    "Direito",
    "Administração",
    "Economia",
    "Arquitetura e Urbanismo",
    "Planejamento Urbano e Regional",
    "Demografia",
    "Ciência da Informação",
    "Museologia",
    "Comunicação",
    "Serviço Social",
    "Economia Doméstica",
    "Desenho Industrial",
    "Turismo",
    "Relações Internacionais",
    "Contabilidade",
    "Marketing",
    "Recursos Humanos",
    "Logística",
    "Comércio Exterior",
    "Gestão Pública",
    "Gestão Ambiental",
    "Secretariado Executivo",
  ],
  ARTES: [
    "Artes",
    "Música",
    "Teatro",
    "Dança",
    "Cinema",
    "Fotografia",
    "Design Gráfico",
    "Design de Moda",
    "Artes Visuais",
  ],
  LINGUISTICA: [
    "Linguística",
    "Letras",
    "Literatura",
    "Tradução",
    "Jornalismo",
    "Publicidade e Propaganda",
    "Rádio e TV",
    "Relações Públicas",
  ],
  TECNOLOGIA: [
    "Nanotecnologia",
    "Robótica",
    "Inteligência Artificial",
    "Análise de Dados",
    "Segurança da Informação",
    "Banco de Dados",
    "Redes de Computadores",
    "Sistemas de Informação",
    "Jogos Digitais",
    "Design de Interação",
    "UX/UI Design",
    "E-commerce",
    "Empreendedorismo",
    "Inovação",
    "Sustentabilidade",
    "Energia Renovável",
    "Automação Industrial",
    "Internet das Coisas (IoT)",
    "Blockchain",
    "Realidade Virtual",
    "Realidade Aumentada",
  ],
  OUTROS: [
    "Multidisciplinar",
    "Ensino",
    "Materiais",
    "Biotecnologia",
    "Ciências Ambientais",
    "Bioética",
    "Divulgação Científica",
    "Política Científica e Tecnológica",
    "Desenvolvimento Sustentável",
    "Estudos de Gênero",
    "Estudos Culturais",
    "Gerontologia",
    "Neurociências",
    "Bioengenharia",
  ],
};

async function main() {
  console.log("🌱 Iniciando seed das áreas de conhecimento...");

  // Verificar se já existem áreas cadastradas
  const existingAreas = await prisma.areaConhecimento.count();

  if (existingAreas > 0) {
    console.log(`⚠️  Já existem ${existingAreas} áreas cadastradas.`);
    console.log("🔄 Adicionando apenas as novas áreas...");
  }

  let adicionadas = 0;
  let ignoradas = 0;

  for (const [categoria, areas] of Object.entries(areasConhecimento)) {
    for (const nome of areas) {
      try {
        await prisma.areaConhecimento.upsert({
          where: { nome },
          update: {},
          create: {
            categoria: categoria as $Enums.CategoriasAreasConhecimento,
            nome,
          },
        });
        adicionadas++;
        console.log(`✅ Área "${nome}" adicionada com sucesso.`);
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          // Erro de unicidade, área já existe
          ignoradas++;
          console.log(`⚪ Área "${nome}" já existe, ignorando.`);
        } else {
          console.error(`❌ Erro ao adicionar a área "${nome}":`, error);
        }
      }
    }
  }

  console.log("\n📊 Resumo:");
  console.log(`✅ Áreas adicionadas: ${adicionadas}`);
  console.log(`⚪ Áreas já existentes: ${ignoradas}`);
  console.log(`📚 Total de áreas: ${adicionadas + existingAreas}`);
  console.log("\n🎉 Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
