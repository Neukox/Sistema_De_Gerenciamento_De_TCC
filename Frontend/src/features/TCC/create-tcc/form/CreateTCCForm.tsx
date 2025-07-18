import Button from "@/components/ui/Button";
import { Input, Datalist, Label, Select, Textarea } from "@/components/ui/form";
import type { AreaConhecimento } from "@/services/fetchProfessoresAreas";
import type { GetProfessor } from "@/types/response/professor";

type CreateTCCFormProps = {
  areasConhecimento: AreaConhecimento[];
  professores: GetProfessor[];
};

/**
 * Componente de formulário para criação de um novo TCC.
 * Inclui campos para título, tema, área do conhecimento, orientador, coorientador,
 * resumo, datas e status atual.
 * @returns JSX.Element - Formulário de criação de TCC.
 */

export default function CreateTCCForm({
  areasConhecimento,
  professores,
}: CreateTCCFormProps) {
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="col-span-2">
        <Label className="" htmlFor="titulo" required>
          Título do TCC
        </Label>
        <Input
          type="text"
          id="titulo"
          name="titulo"
          variant="primary"
          className="w-full"
          placeholder="Digite o título do seu TCC"
          required
        />
      </div>

      {/* Tema do TCC */}
      <div className="col-span-2">
        <Label htmlFor="tema" required>
          Tema do TCC
        </Label>
        <Input
          type="text"
          variant="primary"
          id="tema"
          name="tema"
          className="w-full"
          placeholder="Digite o tema do seu TCC"
          required
        />
      </div>

      {/* Área do conhecimento */}
      <div className="col-span-2">
        <Label htmlFor="areaConhecimento" required>
          Área do Conhecimento
        </Label>
        <Datalist
          id="areaConhecimento"
          variant="primary"
          name="areaConhecimento"
          className="w-full"
          placeholder="Selecione a área do conhecimento"
          options={areasConhecimento.map((area) => ({
            index: area.id,
            value: area.nome,
            label: area.nome,
          }))}
          required
        />
      </div>

      {/* Orientador */}
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="orientador" required>
          Orientador
        </Label>
        <Datalist
          id="orientador"
          variant="primary"
          name="orientador"
          className="w-full"
          placeholder="Selecione o orientador"
          options={professores.map((professor) => ({
            index: professor.id,
            value: professor.nome_completo,
            label: professor.nome_completo,
          }))}
          required
        />
      </div>

      {/* Coorientador */}
      <div className="col-span-2 md:col-span-1">
        <Label htmlFor="coorientador" required={false}>
          Coorientador (Opcional)
        </Label>
        <Datalist
          id="coorientador"
          variant="primary"
          name="coorientador"
          className="w-full"
          placeholder="Selecione o coorientador"
          options={professores.map((professor) => ({
            index: professor.id,
            value: professor.nome_completo,
            label: professor.nome_completo,
          }))}
          required={false}
        />
      </div>

      {/* Resumo do TCC */}
      <div className="col-span-2">
        <Label required htmlFor="resumo">
          Resumo/Descrição
        </Label>
        <Textarea
          id="resumo"
          variant="primary"
          name="resumo"
          className="w-full"
          placeholder="Escreva um resumo ou descrição do seu TCC"
          rows={8}
          required
        />
      </div>

      {/* Data de Início */}
      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="dataInicio">Data de início</Label>
        <Input
          id="dataInicio"
          type="date"
          variant="primary"
          name="dataInicio"
          className="w-full"
        />
      </div>

      {/* Data de Conclusão */}
      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="dataConclusao">Data de conclusão</Label>
        <Input
          type="date"
          variant="primary"
          id="dataConclusao"
          name="dataConclusao"
          className="w-full"
        />
      </div>

      {/* Status Atual */}
      <div className="col-span-2">
        <Label htmlFor="statusAtual" required>
          Status Atual
        </Label>
        <Select
          id="statusAtual"
          variant="primary"
          name="statusAtual"
          className="w-full"
          required
        >
          <option value="">Selecione o status</option>
          <option value="PLANEJAMENTO">Planejamento</option>
          <option value="DESENVOLVIMENTO">Desenvolvimento</option>
          <option value="REVISAO">Revisão</option>
          <option value="FINALIZACAO">Finalização</option>
          <option value="CONCLUIDO">Concluído</option>
        </Select>
      </div>

      {/* Botão de Cadastrar TCC */}
      <div className="col-span-2">
        <Button type="submit" variant="primary" className="w-full">
          Cadastrar TCC
        </Button>
      </div>
    </form>
  );
}
