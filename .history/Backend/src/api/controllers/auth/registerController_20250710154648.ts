import { Request, Response } from "express";
import registerService from "../../services/auth/registerService";
import { validateEmail } from "../../validators/email";

export default async function registerController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    console.log("Register controller called with body:", req.body);
    
    const { nome_completo, email, senha, tipo, curso, area_atuacao } = req.body;

    // Validações básicas
    if (!nome_completo || !email || !senha || !tipo) {
      console.log("Missing required fields");
      res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios.", success: false });
      return;
    }

    // Valida o formato do email
    if (!validateEmail(email)) {
      console.log("Invalid email format");
      res.status(400).json({ message: "Email inválido.", success: false });
      return;
    }

    if (!tipo) {
      console.log("Missing user type");
      res
        .status(400)
        .json({ message: "Tipo de usuário é obrigatório.", success: false });
      return;
    }

    // Chama o serviço de registro
    console.log("Calling register service");
    const { token, user } = await registerService({
      nome_completo,
      email,
      password: senha,
      type: tipo.toUpperCase(), // Converte o tipo para maiúsculas
      ...(curso && { course: curso }),
      ...(area_atuacao && { areaOfExpertise: area_atuacao }),
    });

    console.log("Register service completed successfully");
    
    // Responde com sucesso
    res.status(201).json({
      message: "Usuário registrado com sucesso.",
      success: true,
      token,
      usuario: {
        id: user.id,
        nome_completo: user.nome_completo,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message || "Erro interno do servidor",
        success: false,
      });
    } else {
      res.status(500).json({
        message: "Erro interno do servidor",
        success: false,
      });
    }
  }
}
