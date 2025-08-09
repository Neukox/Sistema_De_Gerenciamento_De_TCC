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
  private readonly baseURL: string = '/api/chat'; // Usar endpoint do backend

  constructor() {
    // Não precisamos da chave de API no frontend
    // O backend vai usar process.env.OPENROUTER_API_KEY
  }

  /**
   * Envia mensagem para o assistente especializado em TCC
   */
  async sendMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const response = await axios.post(
        this.baseURL,
        {
          messages,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 segundos
        }
      );

      return {
        content: response.data.content,
        usage: response.data.usage,
      };
    } catch (error) {
      console.error('Erro na API do assistente:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return {
            content: `🔑 **Chave de API inválida ou expirada**

O assistente de IA não pode se conectar no momento devido a um problema de autenticação.

**Enquanto isso, aqui estão algumas dicas gerais para TCC:**

📚 **Para metodologia de pesquisa:**
- Defina se será qualitativa, quantitativa ou mista
- Escolha instrumentos (questionário, entrevista, análise documental)
- Determine sua amostra/população

📝 **Para estrutura do trabalho:**
- Siga as normas ABNT da sua instituição
- Mantenha coerência entre objetivos, metodologia e resultados
- Use ferramentas como Mendeley ou Zotero para referências

⏰ **Para cronograma:**
- Reserve tempo para orientações
- Inclua período para coleta de dados
- Deixe margem para imprevistos

Reformule sua pergunta de forma mais específica que posso tentar ajudar!`
          };
        }
        if (error.response?.status === 429) {
          return {
            content: `⏱️ **Limite de uso da IA excedido**

O sistema está temporariamente sobrecarregado. Tente novamente em alguns minutos.

**Enquanto aguarda, aqui estão recursos úteis:**

📖 **Para revisão bibliográfica:**
- Use Google Scholar, SciELO, Portal CAPES
- Organize por temas e cronologia
- Mantenha fichamentos detalhados

✍️ **Para escrita:**
- Escreva todos os dias, mesmo que pouco
- Comece pelos capítulos que tem mais domínio
- Revise constantemente

🎯 **Para objetivos:**
- Objetivo geral: amplo, o que pretende alcançar
- Objetivos específicos: como vai alcançar o geral
- Use verbos no infinitivo

Que tipo de ajuda específica você precisa?`
          };
        }
        if (error.code === 'ECONNABORTED') {
          return {
            content: `⏰ **Tempo limite de conexão excedido**

A conexão com o assistente demorou muito para responder.

**Aqui estão algumas dicas úteis enquanto tenta novamente:**

🔄 **Para organização do TCC:**
- Use ferramentas como Notion, Trello ou OneNote
- Crie um cronograma realista com marcos
- Mantenha backup de todos os arquivos

📋 **Estrutura recomendada:**
1. **Introdução** (10-15% do trabalho)
2. **Referencial Teórico** (30-40%)
3. **Metodologia** (15-20%)
4. **Análise/Desenvolvimento** (25-35%)
5. **Considerações Finais** (5-10%)

💡 **Dica importante:** Sempre valide informações com seu orientador!

Tente enviar sua pergunta novamente em alguns instantes.`
          };
        }
      }
      
      // Fallback com resposta útil baseada na mensagem do usuário
      const userMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
      
      if (userMessage.includes('cronograma') || userMessage.includes('tempo') || userMessage.includes('prazo')) {
        return {
          content: `📅 **Dicas para Cronograma de TCC:**

**Distribuição recomendada (6 meses):**
- **Mês 1-2:** Revisão bibliográfica e referencial teórico
- **Mês 3:** Metodologia e preparação da pesquisa  
- **Mês 4:** Coleta de dados/desenvolvimento
- **Mês 5:** Análise dos resultados e escrita
- **Mês 6:** Revisão, formatação e preparação da defesa

**Dicas importantes:**
✅ Reserve 20% do tempo para imprevistos
✅ Agende reuniões regulares com seu orientador
✅ Defina marcos intermediários
✅ Comece pela parte que você tem mais domínio

Precisa de ajuda com alguma etapa específica?`
        };
      }
      
      if (userMessage.includes('metodologia') || userMessage.includes('pesquisa') || userMessage.includes('método')) {
        return {
          content: `🔬 **Guia de Metodologia para TCC:**

**Tipos de pesquisa:**
📊 **Quantitativa:** dados numéricos, estatísticas, questionários
📝 **Qualitativa:** análise interpretativa, entrevistas, observação
🔄 **Mista:** combina ambas as abordagens

**Instrumentos de coleta:**
- Questionários (online: Google Forms, Typeform)
- Entrevistas (presencial ou virtual)
- Análise documental
- Observação participante
- Grupos focais

**Estrutura da metodologia:**
1. Caracterização da pesquisa
2. População e amostra
3. Instrumentos de coleta
4. Procedimentos de análise
5. Aspectos éticos

Qual tipo de TCC você está desenvolvendo?`
        };
      }

      // Resposta genérica com dicas úteis
      return {
        content: `⚠️ **Assistente temporariamente indisponível**

Ocorreu um problema de conexão, mas posso ajudar com informações gerais!

**🎓 Recursos essenciais para TCC:**

**📚 Bases de pesquisa:**
- Google Scholar, SciELO, Portal CAPES
- Repositórios institucionais
- Biblioteca digital da sua universidade

**✍️ Ferramentas de escrita:**
- Microsoft Word/Google Docs (com normas ABNT)
- Mendeley/Zotero (gerenciamento de referências)
- Grammarly (revisão de texto)

**📊 Organização:**
- Notion/Trello (planejamento)
- Google Drive (backup automático)
- Calendário (controle de prazos)

**💡 Dica de ouro:** Mantenha contato regular com seu orientador!

Reformule sua pergunta de forma mais específica que posso tentar ajudar de outra forma.`
      };
    }
  }

  /**
   * Detecta o tipo de ajuda baseado na mensagem do usuário
   */
  detectHelpType(message: string): 'cronograma' | 'metodologia' | 'estrutura' | 'abnt' | 'geral' {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cronograma') || lowerMessage.includes('tempo') || lowerMessage.includes('prazo')) {
      return 'cronograma';
    }
    if (lowerMessage.includes('metodologia') || lowerMessage.includes('pesquisa') || lowerMessage.includes('método')) {
      return 'metodologia';
    }
    if (lowerMessage.includes('estrutura') || lowerMessage.includes('organiz') || lowerMessage.includes('capítulo')) {
      return 'estrutura';
    }
    if (lowerMessage.includes('abnt') || lowerMessage.includes('norma') || lowerMessage.includes('referência') || lowerMessage.includes('citação')) {
      return 'abnt';
    }
    return 'geral';
  }

  /**
   * Gera contexto especializado baseado no tipo de ajuda
   */
  generateTCCContext(helpType: string): string {
    const baseContext = `Você é um assistente especializado em Trabalhos de Conclusão de Curso (TCC). Seja prestativo, objetivo e forneça orientações práticas e aplicáveis. Use uma linguagem clara e acessível para estudantes universitários.`;

    const specificContexts = {
      cronograma: `${baseContext} Foque em ajuda com cronogramas, gestão de tempo, planejamento de etapas e organização temporal do TCC. Forneça dicas práticas sobre como distribuir o tempo entre as diferentes fases do trabalho.`,
      metodologia: `${baseContext} Especialize-se em metodologia de pesquisa, tipos de pesquisa (qualitativa, quantitativa, mista), instrumentos de coleta de dados, análise de resultados e aspectos éticos da pesquisa.`,
      estrutura: `${baseContext} Concentre-se na estrutura do TCC, organização dos capítulos, sequência lógica do trabalho, coerência entre seções e desenvolvimento do conteúdo.`,
      abnt: `${baseContext} Foque em normas ABNT, formatação, citações, referências bibliográficas, estrutura formal do documento e padronização acadêmica.`,
      geral: baseContext
    };

    return specificContexts[helpType as keyof typeof specificContexts] || specificContexts.geral;
  }
}

// Exporta uma instância única do serviço
const assistenteService = new AssistenteService();
export default assistenteService;
