import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Seed das Áreas de Conhecimento
    console.log('📚 Populando áreas de conhecimento...');
    
    // Dados das Áreas de Conhecimento do CNPq
    const areasConhecimento = [
      // GRANDES ÁREAS (Nível 1)
      { codigo: '1.00.00.00-3', nome: 'CIÊNCIAS EXATAS E DA TERRA', nivel: 1 },
      { codigo: '2.00.00.00-6', nome: 'CIÊNCIAS BIOLÓGICAS', nivel: 1 },
      { codigo: '3.00.00.00-9', nome: 'ENGENHARIAS', nivel: 1 },
      { codigo: '4.00.00.00-1', nome: 'CIÊNCIAS DA SAÚDE', nivel: 1 },
      { codigo: '5.00.00.00-4', nome: 'CIÊNCIAS AGRÁRIAS', nivel: 1 },
      { codigo: '6.00.00.00-7', nome: 'CIÊNCIAS SOCIAIS APLICADAS', nivel: 1 },
      { codigo: '7.00.00.00-0', nome: 'CIÊNCIAS HUMANAS', nivel: 1 },
      { codigo: '8.00.00.00-2', nome: 'LINGUÍSTICA, LETRAS E ARTES', nivel: 1 },
      { codigo: '9.00.00.00-5', nome: 'OUTROS', nivel: 1 },

      // ÁREAS (Nível 2) - Principais áreas
      { codigo: '1.01.00.00-8', nome: 'MATEMÁTICA', nivel: 2 },
      { codigo: '1.02.00.00-2', nome: 'PROBABILIDADE E ESTATÍSTICA', nivel: 2 },
      { codigo: '1.03.00.00-7', nome: 'CIÊNCIA DA COMPUTAÇÃO', nivel: 2 },
      { codigo: '1.04.00.00-1', nome: 'ASTRONOMIA', nivel: 2 },
      { codigo: '1.05.00.00-6', nome: 'FÍSICA', nivel: 2 },
      { codigo: '1.06.00.00-0', nome: 'QUÍMICA', nivel: 2 },
      { codigo: '1.07.00.00-5', nome: 'GEOCIÊNCIAS', nivel: 2 },
      { codigo: '1.08.00.00-9', nome: 'OCEANOGRAFIA', nivel: 2 },

      { codigo: '2.01.00.00-0', nome: 'BIOLOGIA GERAL', nivel: 2 },
      { codigo: '2.02.00.00-5', nome: 'GENÉTICA', nivel: 2 },
      { codigo: '2.03.00.00-9', nome: 'BOTÂNICA', nivel: 2 },
      { codigo: '2.04.00.00-3', nome: 'ZOOLOGIA', nivel: 2 },
      { codigo: '2.05.00.00-8', nome: 'ECOLOGIA', nivel: 2 },
      { codigo: '2.06.00.00-2', nome: 'MORFOLOGIA', nivel: 2 },
      { codigo: '2.07.00.00-7', nome: 'FISIOLOGIA', nivel: 2 },
      { codigo: '2.08.00.00-1', nome: 'BIOQUÍMICA', nivel: 2 },
      { codigo: '2.09.00.00-6', nome: 'BIOFÍSICA', nivel: 2 },
      { codigo: '2.10.00.00-8', nome: 'FARMACOLOGIA', nivel: 2 },
      { codigo: '2.11.00.00-2', nome: 'IMUNOLOGIA', nivel: 2 },
      { codigo: '2.12.00.00-7', nome: 'MICROBIOLOGIA', nivel: 2 },
      { codigo: '2.13.00.00-1', nome: 'PARASITOLOGIA', nivel: 2 },

      { codigo: '3.01.00.00-4', nome: 'ENGENHARIA CIVIL', nivel: 2 },
      { codigo: '3.02.00.00-8', nome: 'ENGENHARIA DE MINAS', nivel: 2 },
      { codigo: '3.03.00.00-2', nome: 'ENGENHARIA DE MATERIAIS E METALÚRGICA', nivel: 2 },
      { codigo: '3.04.00.00-7', nome: 'ENGENHARIA ELÉTRICA', nivel: 2 },
      { codigo: '3.05.00.00-1', nome: 'ENGENHARIA MECÂNICA', nivel: 2 },
      { codigo: '3.06.00.00-6', nome: 'ENGENHARIA QUÍMICA', nivel: 2 },
      { codigo: '3.07.00.00-0', nome: 'ENGENHARIA SANITÁRIA', nivel: 2 },
      { codigo: '3.08.00.00-5', nome: 'ENGENHARIA DE PRODUÇÃO', nivel: 2 },
      { codigo: '3.09.00.00-9', nome: 'ENGENHARIA NUCLEAR', nivel: 2 },
      { codigo: '3.10.00.00-1', nome: 'ENGENHARIA DE TRANSPORTES', nivel: 2 },
      { codigo: '3.11.00.00-6', nome: 'ENGENHARIA NAVAL E OCEÂNICA', nivel: 2 },
      { codigo: '3.12.00.00-0', nome: 'ENGENHARIA AEROESPACIAL', nivel: 2 },
      { codigo: '3.13.00.00-5', nome: 'ENGENHARIA BIOMÉDICA', nivel: 2 },

      { codigo: '4.01.00.00-5', nome: 'MEDICINA', nivel: 2 },
      { codigo: '4.02.00.00-9', nome: 'ODONTOLOGIA', nivel: 2 },
      { codigo: '4.03.00.00-3', nome: 'FARMÁCIA', nivel: 2 },
      { codigo: '4.04.00.00-8', nome: 'ENFERMAGEM', nivel: 2 },
      { codigo: '4.05.00.00-2', nome: 'NUTRIÇÃO', nivel: 2 },
      { codigo: '4.06.00.00-7', nome: 'SAÚDE COLETIVA', nivel: 2 },
      { codigo: '4.07.00.00-1', nome: 'FONOAUDIOLOGIA', nivel: 2 },
      { codigo: '4.08.00.00-6', nome: 'FISIOTERAPIA E TERAPIA OCUPACIONAL', nivel: 2 },
      { codigo: '4.09.00.00-0', nome: 'EDUCAÇÃO FÍSICA', nivel: 2 },

      { codigo: '5.01.00.00-9', nome: 'AGRONOMIA', nivel: 2 },
      { codigo: '5.02.00.00-2', nome: 'RECURSOS FLORESTAIS E ENGENHARIA FLORESTAL', nivel: 2 },
      { codigo: '5.03.00.00-7', nome: 'ENGENHARIA AGRÍCOLA', nivel: 2 },
      { codigo: '5.04.00.00-1', nome: 'ZOOTECNIA', nivel: 2 },
      { codigo: '5.05.00.00-6', nome: 'MEDICINA VETERINÁRIA', nivel: 2 },
      { codigo: '5.06.00.00-0', nome: 'RECURSOS PESQUEIROS E ENGENHARIA DE PESCA', nivel: 2 },
      { codigo: '5.07.00.00-5', nome: 'CIÊNCIA E TECNOLOGIA DE ALIMENTOS', nivel: 2 },

      { codigo: '6.01.00.00-1', nome: 'DIREITO', nivel: 2 },
      { codigo: '6.02.00.00-6', nome: 'ADMINISTRAÇÃO', nivel: 2 },
      { codigo: '6.03.00.00-0', nome: 'ECONOMIA', nivel: 2 },
      { codigo: '6.04.00.00-5', nome: 'ARQUITETURA E URBANISMO', nivel: 2 },
      { codigo: '6.05.00.00-9', nome: 'PLANEJAMENTO URBANO E REGIONAL', nivel: 2 },
      { codigo: '6.06.00.00-3', nome: 'DEMOGRAFIA', nivel: 2 },
      { codigo: '6.07.00.00-8', nome: 'CIÊNCIA DA INFORMAÇÃO', nivel: 2 },
      { codigo: '6.08.00.00-2', nome: 'MUSEOLOGIA', nivel: 2 },
      { codigo: '6.09.00.00-7', nome: 'COMUNICAÇÃO', nivel: 2 },
      { codigo: '6.10.00.00-9', nome: 'SERVIÇO SOCIAL', nivel: 2 },
      { codigo: '6.11.00.00-3', nome: 'ECONOMIA DOMÉSTICA', nivel: 2 },
      { codigo: '6.12.00.00-8', nome: 'DESENHO INDUSTRIAL', nivel: 2 },
      { codigo: '6.13.00.00-2', nome: 'TURISMO', nivel: 2 },

      { codigo: '7.01.00.00-4', nome: 'FILOSOFIA', nivel: 2 },
      { codigo: '7.02.00.00-9', nome: 'SOCIOLOGIA', nivel: 2 },
      { codigo: '7.03.00.00-3', nome: 'ANTROPOLOGIA', nivel: 2 },
      { codigo: '7.04.00.00-8', nome: 'ARQUEOLOGIA', nivel: 2 },
      { codigo: '7.05.00.00-2', nome: 'HISTÓRIA', nivel: 2 },
      { codigo: '7.06.00.00-7', nome: 'GEOGRAFIA', nivel: 2 },
      { codigo: '7.07.00.00-1', nome: 'PSICOLOGIA', nivel: 2 },
      { codigo: '7.08.00.00-6', nome: 'EDUCAÇÃO', nivel: 2 },
      { codigo: '7.09.00.00-0', nome: 'CIÊNCIA POLÍTICA', nivel: 2 },
      { codigo: '7.10.00.00-2', nome: 'TEOLOGIA', nivel: 2 },

      { codigo: '8.01.00.00-8', nome: 'LINGUÍSTICA', nivel: 2 },
      { codigo: '8.02.00.00-1', nome: 'LETRAS', nivel: 2 },
      { codigo: '8.03.00.00-6', nome: 'ARTES', nivel: 2 },

      // SUBÁREAS (Nível 3) - Algumas principais
      { codigo: '1.01.01.00-4', nome: 'ÁLGEBRA', nivel: 3 },
      { codigo: '1.01.02.00-0', nome: 'ANÁLISE', nivel: 3 },
      { codigo: '1.01.03.00-7', nome: 'GEOMETRIA E TOPOLOGIA', nivel: 3 },
      { codigo: '1.01.04.00-3', nome: 'MATEMÁTICA APLICADA', nivel: 3 },
      
      { codigo: '1.03.01.00-4', nome: 'TEORIA DA COMPUTAÇÃO', nivel: 3 },
      { codigo: '1.03.02.00-0', nome: 'MATEMÁTICA DA COMPUTAÇÃO', nivel: 3 },
      { codigo: '1.03.03.00-7', nome: 'METODOLOGIA E TÉCNICAS DA COMPUTAÇÃO', nivel: 3 },
      { codigo: '1.03.04.00-3', nome: 'SISTEMAS DE COMPUTAÇÃO', nivel: 3 },
      
      { codigo: '3.01.01.00-0', nome: 'CONSTRUÇÃO CIVIL', nivel: 3 },
      { codigo: '3.01.02.00-7', nome: 'ESTRUTURAS', nivel: 3 },
      { codigo: '3.01.03.00-3', nome: 'GEOTÉCNICA', nivel: 3 },
      { codigo: '3.01.04.00-X', nome: 'ENGENHARIA HIDRÁULICA', nivel: 3 },
      { codigo: '3.01.05.00-6', nome: 'INFRA-ESTRUTURA DE TRANSPORTES', nivel: 3 },
      
      { codigo: '3.04.01.00-3', nome: 'MATERIAIS E COMPONENTES ELÉTRICOS', nivel: 3 },
      { codigo: '3.04.02.00-X', nome: 'MEDIDAS ELÉTRICAS, MAGNÉTICAS E ELETRÔNICAS', nivel: 3 },
      { codigo: '3.04.03.00-6', nome: 'CIRCUITOS ELÉTRICOS, MAGNÉTICOS E ELETRÔNICOS', nivel: 3 },
      { codigo: '3.04.04.00-2', nome: 'SISTEMAS ELÉTRICOS DE POTÊNCIA', nivel: 3 },
      { codigo: '3.04.05.00-9', nome: 'ELETRÔNICA INDUSTRIAL, SISTEMAS E CONTROLES ELETRÔNICOS', nivel: 3 },
      { codigo: '3.04.06.00-5', nome: 'TELECOMUNICAÇÕES', nivel: 3 },
      
      { codigo: '4.01.01.00-1', nome: 'CLÍNICA MÉDICA', nivel: 3 },
      { codigo: '4.01.02.00-8', nome: 'CIRURGIA', nivel: 3 },
      { codigo: '4.01.03.00-4', nome: 'SAÚDE MATERNO-INFANTIL', nivel: 3 },
      { codigo: '4.01.04.00-0', nome: 'SAÚDE MENTAL', nivel: 3 },
      
      { codigo: '6.02.01.00-7', nome: 'ADMINISTRAÇÃO DE EMPRESAS', nivel: 3 },
      { codigo: '6.02.02.00-3', nome: 'ADMINISTRAÇÃO PÚBLICA', nivel: 3 },
      { codigo: '6.02.03.00-X', nome: 'ADMINISTRAÇÃO DE SETORES ESPECÍFICOS', nivel: 3 },
      
      { codigo: '7.08.01.00-4', nome: 'FUNDAMENTOS DA EDUCAÇÃO', nivel: 3 },
      { codigo: '7.08.02.00-0', nome: 'ADMINISTRAÇÃO EDUCACIONAL', nivel: 3 },
      { codigo: '7.08.03.00-7', nome: 'PLANEJAMENTO E AVALIAÇÃO EDUCACIONAL', nivel: 3 },
      { codigo: '7.08.04.00-3', nome: 'ENSINO-APRENDIZAGEM', nivel: 3 },
      { codigo: '7.08.05.00-X', nome: 'CURRÍCULO', nivel: 3 },
      { codigo: '7.08.06.00-6', nome: 'ORIENTAÇÃO E ACONSELHAMENTO', nivel: 3 },
      { codigo: '7.08.07.00-2', nome: 'TÓPICOS ESPECÍFICOS DE EDUCAÇÃO', nivel: 3 }
    ];

    for (const area of areasConhecimento) {
      await prisma.areaConhecimento.upsert({
        where: { codigo: area.codigo },
        update: {},
        create: area
      });
    }

    console.log(`✅ ${areasConhecimento.length} áreas de conhecimento inseridas com sucesso!`);

  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Falha no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Conexão com banco encerrada.');
  });
  'Relações Internacionais',
  'Contabilidade',
  'Marketing',
  'Recursos Humanos',
  'Logística',
  'Comércio Exterior',
  'Gestão Pública',
  'Gestão Ambiental',
  'Secretariado Executivo',
  
  // CIÊNCIAS HUMANAS
  'Filosofia',
  'Sociologia',
  'Antropologia',
  'Arqueologia',
  'História',
  'Geografia',
  'Psicologia',
  'Educação',
  'Ciência Política',
  'Teologia',
  
  // LINGUÍSTICA, LETRAS E ARTES
  'Linguística',
  'Letras',
  'Artes',
  'Música',
  'Teatro',
  'Dança',
  'Cinema',
  'Fotografia',
  'Design Gráfico',
  'Design de Moda',
  'Artes Visuais',
  'Literatura',
  'Tradução',
  'Jornalismo',
  'Publicidade e Propaganda',
  'Rádio e TV',
  'Relações Públicas',
  
  // MULTIDISCIPLINAR
  'Ensino',
  'Materiais',
  'Biotecnologia',
  'Ciências Ambientais',
  'Bioética',
  'Divulgação Científica',
  'Política Científica e Tecnológica',
  'Desenvolvimento Sustentável',
  'Estudos de Gênero',
  'Estudos Culturais',
  'Gerontologia',
  'Neurociências',
  'Bioengenharia',
  'Nanotecnologia',
  'Robótica',
  'Inteligência Artificial',
  'Análise de Dados',
  'Segurança da Informação',
  'Banco de Dados',
  'Redes de Computadores',
  'Sistemas de Informação',
  'Jogos Digitais',
  'Design de Interação',
  'UX/UI Design',
  'E-commerce',
  'Empreendedorismo',
  'Inovação',
  'Sustentabilidade',
  'Energia Renovável',
  'Automação Industrial',
  'Internet das Coisas (IoT)',
  'Blockchain',
  'Realidade Virtual',
  'Realidade Aumentada'
]

async function main() {
  console.log('🌱 Iniciando seed das áreas de conhecimento...')
  
  // Verificar se já existem áreas cadastradas
  const existingAreas = await prisma.areaConhecimento.count()
  
  if (existingAreas > 0) {
    console.log(`⚠️  Já existem ${existingAreas} áreas cadastradas.`)
    console.log('🔄 Adicionando apenas as novas áreas...')
  }
  
  let adicionadas = 0
  let ignoradas = 0
  
  for (const nome of areasConhecimento) {
    try {
      await prisma.areaConhecimento.create({
        data: { nome }
      })
      adicionadas++
      console.log(`✅ Adicionada: ${nome}`)
    } catch (error) {
      // Área já existe (constraint unique)
      ignoradas++
      console.log(`⚪ Já existe: ${nome}`)
    }
  }
  
  console.log('\n📊 Resumo:')
  console.log(`✅ Áreas adicionadas: ${adicionadas}`)
  console.log(`⚪ Áreas já existentes: ${ignoradas}`)
  console.log(`📚 Total de áreas: ${adicionadas + existingAreas}`)
  console.log('\n🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
