import * as z from "zod/mini";

export const editTaskFormSchema = z.object({
  titulo: z.string().check(z.minLength(1, "O título é obrigatório")),
  descricao: z.string().check(z.minLength(1, "A descrição é obrigatória")),
  data_conclusao: z.string().check(
    z.minLength(1, "A data de conclusão é obrigatória"),
    z.refine((date) => new Date(date) >= new Date(), {
      message: "A data de conclusão não pode ser anterior à hoje.",
    })
  ),
  status: z.enum(["PENDENTE", "CONCLUIDA"], {
    message: "Selecione um status válido",
  }),
});

export type EditTaskFormData = z.infer<typeof editTaskFormSchema>;
