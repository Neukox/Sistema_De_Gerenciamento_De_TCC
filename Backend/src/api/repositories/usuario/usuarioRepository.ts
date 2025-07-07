import { Usuario } from "@prisma/client";
import prisma from "../../config/prisma";
import { ICreateUser } from "./interfaces";

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

/**
 * Função para criar um usuário no banco de dados
 * @param {ICreateUser} data - Dados do usuário a ser criado
 * @returns {Promise<Usuario | null>} Retorna o usuário criado ou null se não for possível criar
 */
export async function createUser(data: ICreateUser): Promise<Usuario | null> {
  const usuario = await prisma.usuario.create({
    data: {
      nome_completo: data.fullName,
      email: data.email.toLowerCase(),
      senha: data.password,
      tipo: data.type,
    },
  });

  return usuario;
}
