import axios from 'axios';

export interface ChatMessage {
  role: 'user' | 'assistant'     } catch (error) {
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
      };
    }content: string;
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
