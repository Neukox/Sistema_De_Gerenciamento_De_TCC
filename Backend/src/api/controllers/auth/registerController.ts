import { Request, Response } from "express";
import registerService from "../../services/auth/registerService";
import { validateEmail } from "../../validators/email";

export default async function registerController(
  req: Request,
  res: Response
): Promise<void> {
  const { nome, sobrenome, email, senha, tipo, curso, area_atuacao } = req.body;

  // Validações básicas
  if (!nome || !sobrenome || !email || !senha) {
    res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios.", success: false });
    return;
  }

  // Valida o formato do email
  if (!validateEmail(email)) {
    res.status(400).json({ message: "Email inválido.", success: false });
    return;
  }

  if (!tipo) {
    res
      .status(400)
      .json({ message: "Tipo de usuário é obrigatório.", success: false });
    return;
  }

  // Chama o serviço de registro
  const { token, user } = await registerService({
    name: nome,
    surname: sobrenome,
    email,
    password: senha,
    type: tipo.toUpperCase(), // Converte o tipo para maiúsculas
    ...(curso && { course: curso }),
    ...(area_atuacao && { areaOfExpertise: area_atuacao }),
  });

  // Responde com sucesso
  res.status(201).json({
    message: "Usuário registrado com sucesso.",
    success: true,
    token,
    usuario: {
      id: user.id,
      nome: user.name,
      sobrenome: user.surname,
      email: user.email,
      role: user.role,
    },
  });
}
