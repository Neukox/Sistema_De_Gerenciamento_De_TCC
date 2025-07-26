import type { ReuniaoWithTCC } from "../reuniao";
import type { ApiResponse } from "./base";

export interface GetReunioesResponse extends ApiResponse {
  reunioes: ReuniaoWithTCC[];
}
