import type { TCCProgress } from "../progresso";
import type { ApiResponse } from "./base";

export interface TccProgressResponse extends TCCProgress, ApiResponse {
  id: number;
  titulo: string;
}
