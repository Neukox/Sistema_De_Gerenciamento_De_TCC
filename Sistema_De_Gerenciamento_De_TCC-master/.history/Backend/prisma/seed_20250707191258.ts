import prisma from './PrismaClient/prisma';

const prisma = new PrismaClient()

const areasConhecimento = [
  // CIÊNCIAS EXATAS E DA TERRA
  'Matemática',
  'Probabilidade e Estatística',
  'Ciência da Computação',
  'Astronomia',
  'Física',
  'Química',
  'Geociências',
  'Oceanografia',
  
  // CIÊNCIAS BIOLÓGICAS
  'Biologia Geral',
  'Genética',
  'Botânica',
  'Zoologia',
  'Ecologia',
  'Morfologia',
  'Fisiologia',
  'Bioquímica',
  'Biofísica',
  'Farmacologia',
  'Imunologia',
  'Microbiologia',
  'Parasitologia',
  'Biotecnologia',
  
  // ENGENHARIAS
  'Engenharia Civil',
  'Engenharia de Minas',
  'Engenharia de Materiais e Metalúrgica',
  'Engenharia Elétrica',
  'Engenharia Mecânica',
  'Engenharia Química',
  'Engenharia Sanitária',
  'Engenharia de Produção',
  'Engenharia Nuclear',
  'Engenharia de Transportes',
  'Engenharia Naval e Oceânica',
  'Engenharia Aeroespacial',
  'Engenharia Biomédica',
  'Engenharia de Software',
  'Engenharia de Controle e Automação',
  'Engenharia Ambiental',
  'Engenharia de Alimentos',
  'Engenharia Florestal',
  'Engenharia Agrícola',
  'Engenharia de Pesca',
  'Engenharia Cartográfica',
  'Engenharia Textil',
  'Engenharia de Petróleo',
  'Engenharia de Telecomunicações',
  
  // CIÊNCIAS DA SAÚDE
  'Medicina',
  'Odontologia',
  'Farmácia',
  'Enfermagem',
  'Nutrição',
  'Saúde Coletiva',
  'Fonoaudiologia',
  'Fisioterapia e Terapia Ocupacional',
  'Educação Física',
  'Medicina Veterinária',
  'Psicologia',
  'Biomedicina',
  'Radiologia',
  'Terapia Ocupacional',
  
  // CIÊNCIAS AGRÁRIAS
  'Agronomia',
  'Recursos Florestais e Engenharia Florestal',
  'Engenharia Agrícola',
  'Zootecnia',
  'Medicina Veterinária',
  'Recursos Pesqueiros e Engenharia de Pesca',
  'Ciência e Tecnologia de Alimentos',
  
  // CIÊNCIAS SOCIAIS APLICADAS
  'Direito',
  'Administração',
  'Economia',
  'Arquitetura e Urbanismo',
  'Planejamento Urbano e Regional',
  'Demografia',
  'Ciência da Informação',
  'Museologia',
  'Comunicação',
  'Serviço Social',
  'Economia Doméstica',
  'Desenho Industrial',
  'Turismo',
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
