import {
  Input,
  Label,
  Select,
  Textarea,
  FormError,
  Submit,
} from "../../components/ui/form";
import useEditTCCForm from "./form/edit-tcc-form.hook";
import type { EditTCCFormData } from "./form/edit-tcc-form.schema";
import useEditTCC from "./edit-tcc-fetch";
import type { UpdateTCCRequest } from "../../types/response/tcc";
import { statusTCC } from "../../types/tcc";
import type { AreaConhecimento } from "../../types/area-conhecimento";
import type { TCCData } from "../../types/tcc";

type EditarTCCProps = {
  tccData: TCCData;
  areasConhecimento: AreaConhecimento[];
};

export default function EditarTCC({ tccData, areasConhecimento }: EditarTCCProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useEditTCCForm(tccData);
  const { updateTCC, isLoading } = useEditTCC();

  const onSubmit = (data: EditTCCFormData) => {
    const requestData: UpdateTCCRequest = {
      titulo: data.titulo,
      tema: data.tema,
      resumo: data.resumo,
      dataInicio: data.dataInicio,
      dataConclusao: data.dataConclusao,
      statusAtual: data.status as keyof typeof statusTCC,
      areaConhecimento: data.areaConhecimento,
      orientadorNome: data.orientador,
      coorientadorNome: data.coorientador,
      // Remover curso se não existir no tipo UpdateTCCRequest
    };
    if (typeof tccData.id === "number") {
      updateTCC(tccData.id, requestData);
    } else {
      console.error("ID do TCC não encontrado para edição.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-400">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        {/* Logo e título */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
            {/* Imagem do logo, se houver */}
          </div>
          <h1 className="text-2xl font-bold text-center">FocoTCC</h1>
          <h2 className="text-lg font-semibold text-center mt-2">Editar TCC</h2>
          <p className="text-gray-600 text-center text-sm mt-1">Edite as informações do seu trabalho de conclusão de curso!</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="titulo" required>Título do TCC</Label>
            <Input id="titulo" type="text" variant="primary" className="w-full" placeholder="Digite o título do seu TCC" aria-invalid={!!errors.titulo} {...register("titulo")} />
            {errors.titulo && <FormError>{errors.titulo.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="tema" required>Tema do TCC</Label>
            <Input id="tema" type="text" variant="primary" className="w-full" placeholder="Digite o tema do seu TCC" aria-invalid={!!errors.tema} {...register("tema")} />
            {errors.tema && <FormError>{errors.tema.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="areaConhecimento" required>Área do Conhecimento</Label>
            <Select id="areaConhecimento" variant="primary" className="w-full" aria-invalid={!!errors.areaConhecimento} {...register("areaConhecimento")}> 
              {areasConhecimento.map((area) => (
                <option key={area.id} value={area.nome}>{area.nome}</option>
              ))}
            </Select>
            {errors.areaConhecimento && <FormError>{errors.areaConhecimento.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="curso" required>Curso</Label>
            <Input id="curso" type="text" variant="primary" className="w-full" placeholder="Digite o nome do seu curso" aria-invalid={!!errors.curso} {...register("curso")} />
            {errors.curso && <FormError>{errors.curso.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="orientador" required>Orientador</Label>
            <Input id="orientador" type="text" variant="primary" className="w-full" placeholder="Digite o nome do seu orientador" aria-invalid={!!errors.orientador} {...register("orientador")} />
            {errors.orientador && <FormError>{errors.orientador.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="coorientador">Coorientador</Label>
            <Input id="coorientador" type="text" variant="primary" className="w-full" placeholder="Digite o nome do seu coorientador (opcional)" aria-invalid={!!errors.coorientador} {...register("coorientador")} />
            {errors.coorientador && <FormError>{errors.coorientador.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="resumo" required>Resumo/Descrição</Label>
            <Textarea id="resumo" variant="primary" className="w-full" placeholder="Digite um resumo ou descrição do seu TCC" rows={5} aria-invalid={!!errors.resumo} {...register("resumo")} />
            {errors.resumo && <FormError>{errors.resumo.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="dataInicio" required>Data de início</Label>
            <Input id="dataInicio" type="date" variant="primary" className="w-full" {...register("dataInicio")} aria-invalid={!!errors.dataInicio} />
            {errors.dataInicio && <FormError>{errors.dataInicio.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="dataConclusao" required>Data de conclusão</Label>
            <Input id="dataConclusao" type="date" variant="primary" className="w-full" aria-invalid={!!errors.dataConclusao} {...register("dataConclusao")} />
            {errors.dataConclusao && <FormError>{errors.dataConclusao.message}</FormError>}
          </div>
          <div className="mb-4">
            <Label htmlFor="statusAtual" required>Status Atual</Label>
            <Select id="statusAtual" variant="primary" className="w-full" aria-invalid={!!errors.status} {...register("status")}> 
              {Object.keys(statusTCC).map((status) => (
                <option key={status} value={status}>{status.valueOf()}</option>
              ))}
            </Select>
            {errors.status && <FormError>{errors.status.message}</FormError>}
          </div>
          <div className="mb-4 text-center text-sm text-gray-500">
            (<span className="text-red-600">*</span>) Campos obrigatórios
          </div>
          <div className="mb-2">
            <Submit variant="primary" className="w-full bg-blue-900 text-white hover:bg-blue-800" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Submit>
          </div>
        </form>
      </div>
    </div>
  );
}
