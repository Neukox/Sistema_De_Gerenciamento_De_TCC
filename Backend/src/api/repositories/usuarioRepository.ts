import { Usuario } from "@prisma/client";
import prisma from "../config/prisma";

/**
 * Função para buscar um usuário pelo email no banco de dados
 * @param {string} email - O email do usuário a ser buscado
 * @returns {Promise<object | null>} Retorna o usuário encontrado ou null se não existir
 */
export async function findUserByEmail(email: string): Promise<Usuario> {
  const usuario = await prisma.usuario.findUnique({
    where: { email: email.toLowerCase() },
  });

  return usuario as Usuario;
}
