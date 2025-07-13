//(componente que renderiza cada card)
import { StatusIcon } from "./StatusIcon";
import { getStatusColor } from "@/utils/StatusColor";
import type { IconType } from "react-icons";

interface TarefaCardProps {
  id: number;
  title: string;
  description: string;
  prazo: string;
  stats: string;
}

const MarksCard = ({ id, title, description, prazo, stats }: TarefaCardProps) => {
    // Converte o status para lowercase para padronizar a busca nos objetos
    const lowerStats = stats.toLowerCase();

    // Obtém as cores baseadas no status
    const { cor, colorBackground } = getStatusColor(lowerStats);

    // Obtém o componente do ícone baseado no status
    const Icon: IconType | undefined = StatusIcon[lowerStats];

    return (
        <div className="border border-gray-300 w-full min-h-40 rounded-md p-7 mt-5 shadow-lg">
            <div key={id} className="border-b">
                <div className="flex flex-row items-center gap-1">
                    <h1 className="text-gray-600 text-xl">#{id}</h1>
                    <p className="text-xl font-semibold text-gray-800">{title}</p>
                    <span
                        style={{ color: cor, backgroundColor: colorBackground }}
                        className="text-sm font-medium min-w-20 p-1 flex justify-center items-center gap-2 rounded-md shadow-md"
                    >
                        {/* Renderiza o ícone se existir */}
                        {Icon && <Icon size={18} />}
                        {stats}
                    </span>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                    <p>{description}</p>
                    <p className="text-sm font-medium text-gray-500 mb-1">Prazo: {prazo}</p>
                </div>
            </div>
        </div>
    );
};

export default MarksCard;
