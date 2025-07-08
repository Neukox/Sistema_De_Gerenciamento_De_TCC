import prisma from '../PrismaClient/prisma';

// Dados das Áreas de Conhecimento do CNPq (amostra das principais)
const areasConhecimento = [
  // GRANDES ÁREAS (Nível 1)
  { codigo: '1.00.00.00-3', nome: 'CIÊNCIAS EXATAS E DA TERRA', nivel: 1, pai_id: null },
  { codigo: '2.00.00.00-6', nome: 'CIÊNCIAS BIOLÓGICAS', nivel: 1, pai_id: null },
  { codigo: '3.00.00.00-9', nome: 'ENGENHARIAS', nivel: 1, pai_id: null },
  { codigo: '4.00.00.00-1', nome: 'CIÊNCIAS DA SAÚDE', nivel: 1, pai_id: null },
  { codigo: '5.00.00.00-4', nome: 'CIÊNCIAS AGRÁRIAS', nivel: 1, pai_id: null },
  { codigo: '6.00.00.00-7', nome: 'CIÊNCIAS SOCIAIS APLICADAS', nivel: 1, pai_id: null },
  { codigo: '7.00.00.00-0', nome: 'CIÊNCIAS HUMANAS', nivel: 1, pai_id: null },
  { codigo: '8.00.00.00-2', nome: 'LINGUÍSTICA, LETRAS E ARTES', nivel: 1, pai_id: null },
  { codigo: '9.00.00.00-5', nome: 'OUTROS', nivel: 1, pai_id: null },

  // ÁREAS (Nível 2) - Algumas principais áreas
  { codigo: '1.01.00.00-8', nome: 'MATEMÁTICA', nivel: 2, pai_codigo: '1.00.00.00-3' },
  { codigo: '1.02.00.00-2', nome: 'PROBABILIDADE E ESTATÍSTICA', nivel: 2, pai_codigo: '1.00.00.00-3' },
  { codigo: '1.03.00.00-7', nome: 'CIÊNCIA DA COMPUTAÇÃO', nivel: 2, pai_codigo: '1.00.00.00-3' },
  { codigo: '1.04.00.00-1', nome: 'ASTRONOMIA', nivel: 2, pai_codigo: '1.00.00.00-3' },
  { codigo: '1.05.00.00-6', nome: 'FÍSICA', nivel: 2, pai_codigo: '1.00.00.00-3' },
  { codigo: '1.06.00.00-0', nome: 'QUÍMICA', nivel: 2, pai_codigo: '1.00.00.00-3' },
  { codigo: '1.07.00.00-5', nome: 'GEOCIÊNCIAS', nivel: 2, pai_codigo: '1.00.00.00-3' },
  { codigo: '1.08.00.00-9', nome: 'OCEANOGRAFIA', nivel: 2, pai_codigo: '1.00.00.00-3' },

  { codigo: '3.01.00.00-4', nome: 'ENGENHARIA CIVIL', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.02.00.00-8', nome: 'ENGENHARIA DE MINAS', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.03.00.00-2', nome: 'ENGENHARIA DE MATERIAIS E METALÚRGICA', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.04.00.00-7', nome: 'ENGENHARIA ELÉTRICA', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.05.00.00-1', nome: 'ENGENHARIA MECÂNICA', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.06.00.00-6', nome: 'ENGENHARIA QUÍMICA', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.07.00.00-0', nome: 'ENGENHARIA SANITÁRIA', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.08.00.00-5', nome: 'ENGENHARIA DE PRODUÇÃO', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.09.00.00-9', nome: 'ENGENHARIA NUCLEAR', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.10.00.00-0', nome: 'ENGENHARIA DE TRANSPORTES', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.11.00.00-5', nome: 'ENGENHARIA NAVAL E OCEÂNICA', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.12.00.00-9', nome: 'ENGENHARIA AEROESPACIAL', nivel: 2, pai_codigo: '3.00.00.00-9' },
  { codigo: '3.13.00.00-3', nome: 'ENGENHARIA BIOMÉDICA', nivel: 2, pai_codigo: '3.00.00.00-9' },

  { codigo: '6.01.00.00-1', nome: 'DIREITO', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.02.00.00-6', nome: 'ADMINISTRAÇÃO', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.03.00.00-0', nome: 'ECONOMIA', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.04.00.00-5', nome: 'ARQUITETURA E URBANISMO', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.05.00.00-9', nome: 'PLANEJAMENTO URBANO E REGIONAL', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.06.00.00-3', nome: 'DEMOGRAFIA', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.07.00.00-8', nome: 'CIÊNCIA DA INFORMAÇÃO', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.08.00.00-2', nome: 'MUSEOLOGIA', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.09.00.00-7', nome: 'COMUNICAÇÃO', nivel: 2, pai_codigo: '6.00.00.00-7' },
  { codigo: '6.10.00.00-8', nome: 'SERVIÇO SOCIAL', nivel: 2, pai_codigo: '6.00.00.00-7' },

  // SUBÁREAS (Nível 3) - Algumas subáreas da Ciência da Computação
  { codigo: '1.03.01.00-2', nome: 'TEORIA DA COMPUTAÇÃO', nivel: 3, pai_codigo: '1.03.00.00-7' },
  { codigo: '1.03.02.00-7', nome: 'MATEMÁTICA DA COMPUTAÇÃO', nivel: 3, pai_codigo: '1.03.00.00-7' },
  { codigo: '1.03.03.00-1', nome: 'METODOLOGIA E TÉCNICAS DA COMPUTAÇÃO', nivel: 3, pai_codigo: '1.03.00.00-7' },
  { codigo: '1.03.04.00-6', nome: 'SISTEMAS DE COMPUTAÇÃO', nivel: 3, pai_codigo: '1.03.00.00-7' },

  // ESPECIALIDADES (Nível 4) - Algumas especialidades
  { codigo: '1.03.03.01-8', nome: 'LINGUAGENS DE PROGRAMAÇÃO', nivel: 4, pai_codigo: '1.03.03.00-1' },
  { codigo: '1.03.03.02-6', nome: 'ENGENHARIA DE SOFTWARE', nivel: 4, pai_codigo: '1.03.03.00-1' },
  { codigo: '1.03.03.03-4', nome: 'BANCO DE DADOS', nivel: 4, pai_codigo: '1.03.03.00-1' },
  { codigo: '1.03.03.04-2', nome: 'INTELIGÊNCIA ARTIFICIAL', nivel: 4, pai_codigo: '1.03.03.00-1' },
  { codigo: '1.03.03.05-0', nome: 'PROCESSAMENTO GRÁFICO (GRAPHICS)', nivel: 4, pai_codigo: '1.03.03.00-1' },
];

async function seedAreasConhecimento() {
  console.log('Iniciando seed das áreas de conhecimento...');

  try {
    // Primeiro, criar todas as áreas sem pai (nível 1)
    const areasNivel1 = areasConhecimento.filter(area => area.nivel === 1);
    
    for (const area of areasNivel1) {
      await prisma.areaConhecimento.upsert({
        where: { codigo: area.codigo },
        update: {},
        create: {
          codigo: area.codigo,
          nome: area.nome,
          nivel: area.nivel,
          pai_id: null
        }
      });
      console.log(`Criada área nível 1: ${area.nome}`);
    }

    // Depois, criar áreas de nível 2, 3 e 4 com referência aos pais
    for (let nivel = 2; nivel <= 4; nivel++) {
      const areasNivel = areasConhecimento.filter(area => area.nivel === nivel);
      
      for (const area of areasNivel) {
        // Buscar o pai pelo código
        const pai = await prisma.areaConhecimento.findUnique({
          where: { codigo: area.pai_codigo! }
        });

        if (pai) {
          await prisma.areaConhecimento.upsert({
            where: { codigo: area.codigo },
            update: {},
            create: {
              codigo: area.codigo,
              nome: area.nome,
              nivel: area.nivel,
              pai_id: pai.id
            }
          });
          console.log(`Criada área nível ${nivel}: ${area.nome}`);
        } else {
          console.warn(`Pai não encontrado para área: ${area.nome} (pai: ${area.pai_codigo})`);
        }
      }
    }

    console.log('Seed das áreas de conhecimento concluído com sucesso!');
    
    // Mostrar estatísticas
    const total = await prisma.areaConhecimento.count();
    const porNivel = await prisma.areaConhecimento.groupBy({
      by: ['nivel'],
      _count: true
    });
    
    console.log(`Total de áreas criadas: ${total}`);
    porNivel.forEach(item => {
      console.log(`Nível ${item.nivel}: ${item._count} áreas`);
    });

  } catch (error) {
    console.error('Erro durante o seed:', error);
    throw error;
  }
}

export default seedAreasConhecimento;

// Se executado diretamente
if (require.main === module) {
  seedAreasConhecimento()
    .then(() => {
      console.log('Seed executado com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Erro no seed:', error);
      process.exit(1);
    });
}
