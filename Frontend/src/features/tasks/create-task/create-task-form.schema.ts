import * as z from "zod/mini";

export const TaskFormSchema = z.object({
  titulo: z.string().check(z.minLength(1, "O título é obrigatório")),
  descricao: z.string().check(z.minLength(1, "A descrição é obrigatória")),
  data_conclusao: z.string().check(
    z.minLength(1, "A data de conclusão é obrigatória"),
    z.refine((date) => new Date(date) >= new Date(), {
      message: "A data de conclusão não pode ser anterior à data atual.",
    })
  ),
});

export type CreateTaskFormData = z.infer<typeof TaskFormSchema>;
