import { useState, useRef, useEffect } from 'react';
import assistenteService, { type ChatMessage } from '@/services/assistente/assistenteService';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function useAssistenteTCC() {
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

  // Função para enviar mensagem
  const sendMessage = async (text?: string) => {
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
      // Detecta o tipo de ajuda baseado na mensagem
      const helpType = assistenteService.detectHelpType(messageText);
      const systemContext = assistenteService.generateTCCContext(helpType);

      // Prepara o histórico de conversa (últimas 4 mensagens)
      const conversationHistory: ChatMessage[] = messages.slice(-4).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));

      // Monta as mensagens para a API
      const apiMessages: ChatMessage[] = [
        { role: 'system', content: systemContext },
        ...conversationHistory,
        { role: 'user', content: messageText }
      ];

      // Chama o service
      const response = await assistenteService.sendMessage(apiMessages);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.content,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao chamar IA:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: error instanceof Error ? error.message : 'Desculpe, ocorreu um erro. Tente novamente ou reformule sua pergunta.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Função para limpar conversa
  const clearConversation = () => {
    setMessages([]);
  };

  // Função para lidar com teclas pressionadas
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return {
    messages,
    inputText,
    setInputText,
    isTyping,
    messagesEndRef,
    sendMessage,
    clearConversation,
    handleKeyPress,
  };
}
