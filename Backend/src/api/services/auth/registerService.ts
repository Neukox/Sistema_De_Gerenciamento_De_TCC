import { AuthPayload, IRegisterService } from "./contracts";
import { findUserByEmail } from "../../repositories/usuario/usuarioRepository";
import { createUser } from "../../repositories/usuario/usuarioRepository";
<<<<<<< HEAD
import { createAluno } from "../../repositories/aluno/alunoRepository";
import { createProfessor } from "../../repositories/professor/professorRepository";
=======
import { createAluno } from "../../repositories/alunoRepository";
import { createProfessor } from "../../repositories/professorRepository";
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
import bycrypt from "bcryptjs";
import { ResponseError } from "../../helpers/ResponseError";
import { generateJwtToken } from "../../utils/jwt";
import { Usuario } from "@prisma/client";

/**
 * Função para registrar um novo usuário
 * @param {IRegisterService} params - Dados do usuário a ser registrado
 * @returns {Promise<Usuario | null>} Retorna o usuário criado ou null se não for possível criar
 */

export default async function registerUser(
  params: IRegisterService
): Promise<AuthPayload> {
  // Verifica se o usuário já existe
  const existingUser = await findUserByEmail(params.email);
  if (existingUser) {
    throw new ResponseError(
      400,
      "Este email já está cadastrado. Por favor, tente outro email."
    );
  }

  // Cria o usuário
  const hashedPassword = await bycrypt.hash(params.password, 10);

  // Cria o aluno ou professor, dependendo do tipo
  let createdUser: Usuario | null = null;

  switch (params.type) {
    case "ALUNO":
      if (!params.course) {
        throw new ResponseError(400, "Curso é obrigatório para o tipo ALUNO.");
      }

      // Cria o registro de aluno
      createdUser = await createUser({
<<<<<<< HEAD
        fullName: params.nome_completo,
=======
        name: params.name,
        surname: params.surname,
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
        email: params.email.toLowerCase(),
        password: hashedPassword,
        type: params.type,
      });

      if (!createdUser) {
        throw new ResponseError(
          500,
          "Erro ao criar usuário. Por favor, tente novamente mais tarde."
        );
      }

      await createAluno({
<<<<<<< HEAD
        Usuario_id: createdUser.id,
=======
        fk_Usuario_id: createdUser.id,
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
        curso: params.course,
      });
      break;
    case "PROFESSOR":
      if (!params.areaOfExpertise) {
        throw new ResponseError(
          400,
          "Área de atuação é obrigatória para o tipo PROFESSOR."
        );
      }

      // Cria o registro de professor
      createdUser = await createUser({
<<<<<<< HEAD
        fullName: params.nome_completo,
        email: params.email.toLowerCase(), 
        password: hashedPassword,
        type: params.type,
=======
        name: params.name,
        surname: params.surname,
        email: params.email.toLowerCase(), // Armazenar email em minúsculas
        password: hashedPassword, // A senha deve ser criptografada antes de ser salva
        type: params.type, // 'ALUNO', 'PROFESSOR' ou 'ADMIN'
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
      });

      if (!createdUser) {
        throw new ResponseError(
          500,
          "Erro ao criar usuário. Por favor, tente novamente mais tarde."
        );
      }

      await createProfessor({
<<<<<<< HEAD
        Usuario_id: createdUser.id,
=======
        fk_Usuario_id: createdUser.id,
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
        area_atuacao: params.areaOfExpertise,
      });
      break;
    case "ADMIN":
      createdUser = await createUser({
<<<<<<< HEAD
        fullName: params.nome_completo,
=======
        name: params.name,
        surname: params.surname,
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
        email: params.email.toLowerCase(),
        password: hashedPassword,
        type: params.type,
      });

      if (!createdUser) {
        throw new ResponseError(
          500,
          "Erro ao criar usuário. Por favor, tente novamente mais tarde."
        );
      }
      break;
    default:
      throw new ResponseError(400, "Tipo de usuário inválido");
  }

  // Geração do token JWT
  const payload = {
    id: createdUser.id,
<<<<<<< HEAD
    nome_completo: createdUser.nome_completo,
=======
    name: createdUser.nome,
    surname: createdUser.sobrenome,
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
    role: createdUser.tipo,
    email: createdUser.email,
  };

  // gerar o token JWT
  const token = generateJwtToken(payload);

  // Retorna o payload de autenticação
  return {
    token,
    user: {
      id: createdUser.id,
<<<<<<< HEAD
      nome_completo: createdUser.nome_completo,
=======
      name: createdUser.nome,
      surname: createdUser.sobrenome,
>>>>>>> b16b839 (Adicionando controlador e serviço de registro de usuário)
      role: createdUser.tipo,
      email: createdUser.email,
    },
  };
}
