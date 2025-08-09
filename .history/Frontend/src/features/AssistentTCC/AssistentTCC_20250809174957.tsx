import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Card from '@/components/ui/card/Card';
import Button from '@/components/ui/Button';

import { RiRobot2Line } from "react-icons/ri";
import { BsStars } from "react-icons/bs";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Contexto específico para TCC
const TCC_CONTEXT = `Você é um assistente especializado em Trabalhos de Conclusão de Curso (TCC) chamado FocoTCC Assistant. 

SUAS FUNÇÕES PRINCIPAIS:
- Auxiliar na organização e planejamento de TCCs
- Sugerir cronogramas e metodologias
- Ajudar com estruturação de capítulos
- Orientar sobre normas ABNT
- Dar dicas de pesquisa acadêmica
- Auxiliar na definição de objetivos e metodologia

DIRETRIZES:
- Seja sempre objetivo e prático
- Foque em soluções aplicáveis
- Use linguagem acadêmica mas acessível
- Sugira ferramentas e recursos úteis
- Incentive a organização e disciplina

Responda de forma concisa e útil, priorizando ações práticas que o usuário pode implementar imediatamente.`;

// Sugestões rápidas para TCC
const QUICK_SUGGESTIONS = [
  "Como estruturar meu cronograma?",
  "Ajuda com metodologia de pesquisa",
  "Como organizar as referências?",
  "Dicas para revisão bibliográfica",
  "Como definir objetivos específicos?",
  "Estrutura dos capítulos do TCC"
];

function AssistantTCC() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função otimizada para chamada da API
  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Contexto otimizado com histórico das últimas 3 mensagens
      const conversationHistory = messages.slice(-3).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: TCC_CONTEXT },
            ...conversationHistory,
            { role: 'user', content: messageText }
          ],
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiText = response.data.choices[0].message.content;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao chamar IA:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Desculpe, ocorreu um erro. Tente novamente ou reformule sua pergunta.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="flex bg-secondary min-h-screen w-full p-4">
      <div className="flex justify-center items-center w-full h-full min-h-[calc(100vh-2rem)]">
        <Card className="max-w-6xl w-full h-[700px] bg-neutral flex flex-col shadow-2xl">
          {/* Header do Chat */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-black bg-secondary rounded-lg flex items-center justify-center">
                <BsStars size={25} className='text-primary' />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary">FocoTCC Assistant</h2>
                <p className="text-sm text-gray-600">Especialista em TCCs</p>
              </div>
            </div>
            {messages.length > 0 && (
              <Button
                onClick={clearConversation}
                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300"
              >
                Limpar Conversa
              </Button>
            )}
          </div>

          {/* Área da Conversa */}
          <div className="flex-1 overflow-hidden">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <RiRobot2Line size={30} className='text-secondary' />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Olá! Sou seu assistente especializado em TCC
                </h3>
                <p className="text-gray-600 max-w-md text-center mb-6">
                  Posso ajudar com organização, metodologia, cronograma e muito mais!
                </p>
                
                {/* Sugestões Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                  {QUICK_SUGGESTIONS.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-6">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
                          message.isUser
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg max-w-xs">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>

          {/* Input de Mensagem */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                variant="primary"
                className="px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AssistantTCC;
