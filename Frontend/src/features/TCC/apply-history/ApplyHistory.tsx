import Pagination from "@/components/ui/Pagination";
import ApplyHistoryContainer from "./ApplyHistoryContainer";
import { ArrowDown, Clock, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/form";

export function HistoricoAtividades() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="bg-neutral w-full p-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
        <div className="flex justify-center items-center gap-2">
          <Clock className="size-6" />
          <h1 className="font-semibold text-2xl">Histórico de Atividades</h1>
        </div>

        <Button className="flex items-center gap-2">
          <ArrowDown className="size-6" />
          Exportar
        </Button>
      </Card>
      <Card className="p-4 flex flex-wrap items-center gap-4">
        <div className="bg-white flex items-center flex-1 basis-60 text-gray-700 rounded-lg px-2 shadow-sm gap-3 border-[1.5px] border-gray-400 has-[input]:hover:border-blue-700 has-[input:focus]:border-blue-700 has-[input:focus]:ring-2 has-[input:focus]:ring-blue-300">
          <Search className="size-5" />
          <Input
            type="search"
            placeholder="Buscar no histórico..."
            className="w-full border-none focus:ring-0 px-0"
          />
        </div>

        <div className="flex gap-4 basis-60 flex-wrap flex-1">
          <Select variant="primary" className="flex-1" defaultValue="">
            <option value="">Todos os tipos</option>
            <option value="tarefas">Tarefas</option>
            <option value="sistema">Sistema</option>
          </Select>
          <Select className="flex-1" defaultValue="">
            <option value="">Todas as datas</option>
            <option value="hoje">Hoje</option>
            <option value="ultima_semana">Última semana</option>
            <option value="ultimo_mes">Último mês</option>
          </Select>
        </div>
      </Card>

      {/* Seção de Atividades Recentes */}
      <div className="bg-historicoatividades w-full h-full max-w-6xl p-6 rounded-2xl flex flex-col gap-6">
        <h2 className="flex font-semibold ml-3 text-2xl">
          Atividades Recentes
        </h2>
        <ApplyHistoryContainer />
        <Pagination
          page={1}
          totalPages={2}
          onPageChange={(page) => console.log("Mudar para a página:", page)}
        />
      </div>
    </div>
  );
}
