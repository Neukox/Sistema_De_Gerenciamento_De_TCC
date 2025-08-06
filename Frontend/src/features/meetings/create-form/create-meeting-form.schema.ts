import * as z from "zod/mini";

const createMeetingFormSchema = z.object({
  titulo: z.string().check(z.minLength(1, "O título é obrigatório")),
  descricao: z.string().check(z.minLength(1, "A descrição é obrigatória")),
  data_agendada: z.string().check(
    z.minLength(1, "A data agendada é obrigatória"),
    z.refine((date) => new Date(date) > new Date(), {
      message: "A data agendada não pode ser anterior à data atual.",
    })
  ),
  observacoes: z.optional(z.string()),
});

export type CreateMeetingFormData = z.infer<typeof createMeetingFormSchema>;
export default createMeetingFormSchema;
