import { DecodedUser } from "../../api/types/auth";

// Esse arquivo "diz" ao TypeScript que estamos adicionando propriedades no objeto Request

declare module "express-serve-static-core" {
  interface Request {
    token?: string;
    user?: DecodedUser;
  }
}
