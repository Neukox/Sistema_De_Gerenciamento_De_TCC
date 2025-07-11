import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Rodando seed...');

  await prisma.usuario.create({
    data: {
      nome_completo: 'Admin do Sistema',
      email: 'Gabrielcfonline0900@gmail.com',
      senha: '10668889730',
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
