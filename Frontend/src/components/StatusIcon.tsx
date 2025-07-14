import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
import { FaGear } from "react-icons/fa6";
import type { IconType } from "react-icons";

// Mapeia os status para componentes React de ícones
export const StatusIcon: Record<string, IconType> = {
    desenvolvimento: FaGear,
    concluído: FaRegCheckCircle,
    pendente: FaRegClock,
    atrasado: TiWarningOutline,
} as const;
