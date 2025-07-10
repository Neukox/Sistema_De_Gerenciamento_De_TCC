import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Rodando seed...');

  await prisma.usuario.create({
    data: {
      nome_completo: 'Admin do Sistema',
      email: 'admin@example.com',
      senha: 'senha123',
      tipo: 'ADMIN',
    },
  });

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
