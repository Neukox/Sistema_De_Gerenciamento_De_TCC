import * as z from "zod/mini";
import { statusTCC } from "@/types/tcc";

/**
 * Schema de validação para o formulário de criação de TCC.
 * Utiliza a biblioteca Zod para definir as regras de validação.
 */
export const TCCFormSchema = z
  .object({
    titulo: z.string().check(z.minLength(1, "Título é obrigatório")),
    tema: z.string().check(z.minLength(1, "Tema é obrigatório")),
    areaConhecimento: z
      .string()
      .check(z.minLength(1, "Área de conhecimento é obrigatória")),
    orientador: z.string().check(z.minLength(1, "Orientador é obrigatório")),
    coorientador: z.optional(z.string()),
    resumo: z.string().check(z.minLength(1, "Resumo é obrigatório")),
    dataInicio: z.string({
      message: "Data de início é obrigatória",
    }),
    dataConclusao: z.string({
      message: "Data de conclusão é obrigatória",
    }),
    status: z
      .enum(Object.keys(statusTCC) as [string, ...string[]], {
        message: "Status é obrigatório",
      })
      .check(
        z.refine(
          (val) => {
            return Object.keys(statusTCC).includes(val);
          },
          { message: "Status inválido" }
        ),
      ),
  })
  .check(
    z.refine(
      (data) => {
        const dateInicio = new Date(data.dataInicio);
        const dateConclusao = new Date(data.dataConclusao);
        return dateInicio < dateConclusao;
      },
      {
        message: "A data de início deve ser anterior à data de término",
        path: ["dataInicio"],
      }
    )
  );

export type TCCFormData = z.infer<typeof TCCFormSchema>;
export default TCCFormSchema;
