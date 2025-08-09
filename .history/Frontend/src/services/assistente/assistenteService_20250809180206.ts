import axios from 'axios';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class AssistenteService {
  private readonly apiKey: string;
  private readonly baseURL: string = 'https://openrouter.ai/api/v1/chat/completions';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!this.apiKey) {
      console.warn('VITE_OPENROUTER_API_KEY não configurada');
    }
  }

  /**
   * Verifica se a API está configurada
   */
  private isConfigured(): boolean {
    return !!this.apiKey && this.apiKey !== 'undefined' && this.apiKey.startsWith('sk-');
  }

  /**
   * Envia mensagem para o assistente especializado em TCC
   */
  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    // Verifica se a API está configurada
    if (!this.isConfigured()) {
      return {
        content: `Desculpe, o assistente de IA não está configurado no momento. 

Por favor, entre em contato com o administrador do sistema para configurar a chave da API OpenRouter.

Enquanto isso, posso sugerir algumas dicas gerais para TCC:

📝 **Estrutura básica do TCC:**
1. Introdução
2. Referencial Teórico
3. Metodologia
4. Desenvolvimento/Análise
5. Considerações Finais
6. Referências

⏰ **Dicas de cronograma:**
- Reserve 20% do tempo para revisões
- Comece pela bibliografia
- Defina prazos intermediários
- Deixe tempo para formatação

Você pode reformular sua pergunta de forma mais específica que posso tentar ajudar de outra forma!`
      };
    }

    try {
      const response = await axios.post(
        this.baseURL,
        {
          model: 'openai/gpt-4o-mini',
          messages,
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin,
            'X-Title': 'FocoTCC Assistant',
          },
          timeout: 30000, // 30 segundos
        }
      );

      return {
        content: response.data.choices[0].message.content,
        usage: response.data.usage,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Chave de API inválida ou expirada');
        }
        if (error.response?.status === 429) {
          throw new Error('Limite de uso excedido. Tente novamente em alguns minutos');
        }
        if (error.code === 'ECONNABORTED') {
          throw new Error('Tempo limite excedido. Tente novamente');
        }
        throw new Error(error.response?.data?.error?.message || 'Erro na comunicação com a IA');
      }
      throw new Error('Erro desconhecido');
    }
  }

  /**
   * Gera contexto específico para TCC baseado no tipo de ajuda
   */
  generateTCCContext(helpType?: 'cronograma' | 'metodologia' | 'estrutura' | 'normas' | 'geral'): string {
    const baseContext = `Você é o FocoTCC Assistant, um especialista em Trabalhos de Conclusão de Curso. 
    Forneça respostas práticas, organizadas e aplicáveis imediatamente.`;

    const specificContexts = {
      cronograma: `${baseContext} Foque em planejamento temporal, divisão de tarefas e gestão de prazos.`,
      metodologia: `${baseContext} Foque em metodologias de pesquisa, tipos de estudo e coleta de dados.`,
      estrutura: `${baseContext} Foque na organização de capítulos, estrutura do trabalho e formatação.`,
      normas: `${baseContext} Foque nas normas ABNT, citações, referências e formatação acadêmica.`,
      geral: baseContext,
    };

    return specificContexts[helpType || 'geral'];
  }

  /**
   * Detecta o tipo de ajuda baseado na mensagem do usuário
   */
  detectHelpType(message: string): 'cronograma' | 'metodologia' | 'estrutura' | 'normas' | 'geral' {
    const keywords = {
      cronograma: ['cronograma', 'prazo', 'tempo', 'planejamento', 'agenda', 'data'],
      metodologia: ['metodologia', 'método', 'pesquisa', 'dados', 'amostra', 'questionário'],
      estrutura: ['estrutura', 'capítulo', 'organização', 'sumário', 'índice'],
      normas: ['abnt', 'norma', 'citação', 'referência', 'formatação', 'bibliografia'],
    };

    const messageLower = message.toLowerCase();
    
    for (const [type, words] of Object.entries(keywords)) {
      if (words.some(word => messageLower.includes(word))) {
        return type as keyof typeof keywords;
      }
    }
    
    return 'geral';
  }
}

export default new AssistenteService();
