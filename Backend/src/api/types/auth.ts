import { Request } from "express";

export interface DecodedUser {
  id: number;
  name: string;
  surname: string;
  role: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedUser;
  token?: string;
}
