import { Input, Datalist, Label, Select, Textarea, FormError, Submit } from "@/components/ui/form";
import type { GetProfessor } from "@/types/response/professor";
import type { AreaConhecimento } from "@/types/area-conhecimento";
import { statusTCC } from "@/types/tcc";
import { useEditTCCForm } from "./edit-tcc-form.hook";
import type { EditTCCFormData } from "./edit-tcc-form.schema";
import { useEditTCC } from "./edit-tcc-fetch";

type EditTCCFormProps = {
  areasConhecimento: AreaConhecimento[];
  professores: GetProfessor[];
};

export default function EditarTCC({ areasConhecimento, professores }: EditTCCFormProps) {
  const { register, handleSubmit, formState: { errors } } = useEditTCCForm();
  const { editTCC, isLoading } = useEditTCC();
  const onSubmit = (data: EditTCCFormData) => {
    editTCC(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 text-center mb-2">
          <span className="block text-2xl font-bold text-blue-900">FocoTCC</span>
          <span className="block text-lg font-semibold mt-2 text-blue-900">Editar TCC</span>
          <span className="block text-gray-600 text-sm mt-1">Edite as informações do seu trabalho de conclusão de curso!</span>
        </div>

        <div className="col-span-2">
          <Label htmlFor="titulo" required>
            Título do Trabalho
          </Label>
          <Input
            id="titulo"
            type="text"
            variant="primary"
            className="w-full"
            placeholder="Digite o título do seu TCC"
            aria-invalid={!!errors.titulo}
            {...register("titulo")}
          />
          {errors.titulo && <FormError>{errors.titulo.message}</FormError>}
        </div>

        <div className="col-span-2">
          <Label htmlFor="tema" required>
            Tema do Trabalho
          </Label>
          <Input
            id="tema"
            type="text"
            variant="primary"
            className="w-full"
            placeholder="Digite o tema do seu TCC"
            aria-invalid={!!errors.tema}
            {...register("tema")}
          />
          {errors.tema && <FormError>{errors.tema.message}</FormError>}
        </div>

        <div className="col-span-2">
          <Label htmlFor="areaConhecimento" required>
            Área de Conhecimento
          </Label>
          <Datalist
            id="areaConhecimento"
            variant="primary"
            className="w-full"
            placeholder="Selecione a área do conhecimento"
            options={areasConhecimento.map((area) => ({
              index: area.id,
              value: area.nome,
            }))}
            aria-invalid={!!errors.areaConhecimento}
            {...register("areaConhecimento")}
          />
          {errors.areaConhecimento && (
            <FormError>{errors.areaConhecimento.message}</FormError>
          )}
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="orientador" required>
            Nome do Orientador
          </Label>
          <Datalist
            id="orientador"
            variant="primary"
            className="w-full"
            placeholder="Selecione o orientador"
            options={professores.map((professor) => ({
              index: professor.id,
              value: professor.nome_completo,
            }))}
            aria-invalid={!!errors.orientador}
            {...register("orientador")}
          />
          {errors.orientador && (
            <FormError>{errors.orientador.message}</FormError>
          )}
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="coorientador" required={false}>
            Nome do Coorientador (Opcional)
          </Label>
          <Datalist
            id="coorientador"
            variant="primary"
            className="w-full"
            placeholder="Selecione o coorientador"
            options={professores.map((professor) => ({
              index: professor.id,
              value: professor.nome_completo,
              label: professor.nome_completo,
            }))}
            aria-invalid={!!errors.coorientador}
            {...register("coorientador")}
          />
          {errors.coorientador && (
            <FormError>{errors.coorientador.message}</FormError>
          )}
        </div>

        <div className="col-span-2">
          <Label required htmlFor="resumo">
            Resumo do Trabalho
          </Label>
          <Textarea
            id="resumo"
            variant="primary"
            className="w-full"
            placeholder="Escreva um resumo ou descrição do seu TCC"
            rows={8}
            aria-invalid={!!errors.resumo}
            {...register("resumo")}
          />
          {errors.resumo && <FormError>{errors.resumo.message}</FormError>}
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="dataInicio" required>
            Data de Início
          </Label>
          <Input
            id="dataInicio"
            type="date"
            variant="primary"
            className="w-full"
            {...register("dataInicio")}
            aria-invalid={!!errors.dataInicio}
          />
          {errors.dataInicio && (
            <FormError>{errors.dataInicio.message}</FormError>
          )}
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="dataConclusao" required>
            Data de Conclusão
          </Label>
          <Input
            id="dataConclusao"
            type="date"
            variant="primary"
            className="w-full"
            aria-invalid={!!errors.dataConclusao}
            {...register("dataConclusao")}
          />
          {errors.dataConclusao && (
            <FormError>{errors.dataConclusao.message}</FormError>
          )}
        </div>

        <div className="col-span-2">
          <Label htmlFor="statusAtual" required>
            Status do TCC
          </Label>
          <Select
            id="statusAtual"
            variant="primary"
            className="w-full"
            aria-invalid={!!errors.status}
            placeholder="Selecione o status atual do TCC"
            {...register("status")}
          >
            {Object.keys(statusTCC).map((status) => (
              <option key={status} value={status}>
                {status.valueOf()}
              </option>
            ))}
          </Select>
          {errors.status && <FormError>{errors.status.message}</FormError>}
        </div>

        <div className="col-span-2" role="note">
          <p>
            ( <span className="text-red-600">*</span> ) Campos obrigatórios
          </p>
        </div>

        <div className="col-span-2">
          <Submit variant="primary" className="w-full bg-blue-900 text-white" disabled={isLoading}>
            Salvar Alterações
          </Submit>
        </div>
      </form>
    </div>
  );
}
          }))}
          aria-invalid={!!errors.orientador}
          {...register("orientador")}
        />
        {errors.orientador && (
          <FormError>{errors.orientador.message}</FormError>
        )}
      </div>

      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="coorientador" required={false}>
          Nome do Coorientador (Opcional)
        </Label>
        <Datalist
          id="coorientador"
          variant="primary"
          className="w-full"
          placeholder="Selecione o coorientador"
          options={professores.map((professor) => ({
            index: professor.id,
            value: professor.nome_completo,
            label: professor.nome_completo,
          }))}
          aria-invalid={!!errors.coorientador}
          {...register("coorientador")}
        />
        {errors.coorientador && (
          <FormError>{errors.coorientador.message}</FormError>
        )}
      </div>

      <div className="col-span-2">
        <Label required htmlFor="resumo">
          Resumo do Trabalho
        </Label>
        <Textarea
          id="resumo"
          variant="primary"
          className="w-full"
          placeholder="Escreva um resumo ou descrição do seu TCC"
          rows={8}
          aria-invalid={!!errors.resumo}
          {...register("resumo")}
        />
        {errors.resumo && <FormError>{errors.resumo.message}</FormError>}
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="dataInicio" required>
          Data de Início
        </Label>
        <Input
          id="dataInicio"
          type="date"
          variant="primary"
          className="w-full"
          {...register("dataInicio")}
          aria-invalid={!!errors.dataInicio}
        />
        {errors.dataInicio && (
          <FormError>{errors.dataInicio.message}</FormError>
        )}
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="dataConclusao" required>
          Data de Conclusão
        </Label>
        <Input
          id="dataConclusao"
          type="date"
          variant="primary"
          className="w-full"
          aria-invalid={!!errors.dataConclusao}
          {...register("dataConclusao")}
        />
        {errors.dataConclusao && (
          <FormError>{errors.dataConclusao.message}</FormError>
        )}
      </div>

      <div className="col-span-2">
        <Label htmlFor="statusAtual" required>
          Status do TCC
        </Label>
        <Select
          id="statusAtual"
          variant="primary"
          className="w-full"
          aria-invalid={!!errors.status}
          placeholder="Selecione o status atual do TCC"
          {...register("status")}
        >
          {Object.keys(statusTCC).map((status) => (
            <option key={status} value={status}>
              {status.valueOf()}
            </option>
          ))}
        </Select>
        {errors.status && <FormError>{errors.status.message}</FormError>}
      </div>

      <div className="col-span-2" role="note">
        <p>
          ( <span className="text-red-600">*</span> ) Campos obrigatórios
        </p>
      </div>

      <div className="col-span-2">
        <Submit variant="primary" className="w-full" disabled={isLoading}>
          Salvar Alterações
        </Submit>
      </div>
    </form>
  );
}
