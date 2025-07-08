import { PrismaClient } from '@prisma/client';
import seedAreasConhecimento from './seedAreasConhecimento';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');
  
  try {
    // Executar seed das áreas de conhecimento
    await seedAreasConhecimento();
    
    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
