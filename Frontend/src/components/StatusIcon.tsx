import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
import { VscOpenPreview } from "react-icons/vsc";
import { LuNotebookText } from "react-icons/lu";
import { FaGear } from "react-icons/fa6";
import { MdIncompleteCircle } from "react-icons/md";
import type { IconType } from "react-icons";

// Mapeia os status para componentes React de ícones
export const StatusIcon: Record<string, IconType> = {
    planejamento: LuNotebookText,
    desenvolvimento: FaGear,
    revisao: VscOpenPreview,
    finalizacao: MdIncompleteCircle,
    concluido: FaRegCheckCircle,
    pendente: FaRegClock,
    atrasado: TiWarningOutline,
} as const;
