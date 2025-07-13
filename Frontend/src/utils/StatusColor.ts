export const StatusColor = {
    planejamento: { cor: '#4FC3F7', colorBackground: '#dceafe' },
    desenvolvimento: { cor: '#1976D2', colorBackground: '#BBDEFB' },
    revisao: { cor: '#908852', colorBackground: '#FBEB93' },
    finalizacao: { cor: '#853717', colorBackground: '#FFE0B2' },
    concluido: { cor: '#4CAF50', colorBackground: '#C8E6C9' },
    pendente: { cor: '#878787', colorBackground: '#E0E0E0' },
    atrasado: { cor: '#5C4141', colorBackground: '#FFCDD2' },
} as const;

export type StatusType = keyof typeof StatusColor;

// Função que recebe um status e retorna as cores correspondentes
export function getStatusColor(stats: string) {
    const colorData = StatusColor[stats as StatusType]; 
    // Retorna o objeto de cores ou um padrão caso status não exista
    return colorData ?? {
        cor: '#0000',
        colorBackground: '#00000',
    };
}
