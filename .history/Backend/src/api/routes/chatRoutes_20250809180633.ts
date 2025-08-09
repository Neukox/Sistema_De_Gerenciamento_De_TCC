import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

router.post('/chat', async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Mensagens inválidas' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:5173',
          'X-Title': 'FocoTCC Assistant',
        },
        timeout: 30000,
      }
    );

    // Retorna a resposta no formato esperado pelo frontend
    res.json({
      content: response.data.choices[0].message.content,
      usage: response.data.usage,
    });
  } catch (error: any) {
    console.error('Erro na API OpenRouter:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Chave de API inválida ou expirada' });
    }
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Limite de uso da IA excedido' });
    }
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ error: 'Tempo limite de conexão excedido' });
    }
    
    res.status(500).json({ error: 'Erro ao chamar API de IA' });
  }
});

export default router;
