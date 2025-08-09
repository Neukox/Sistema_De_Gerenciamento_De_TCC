import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.post('/chat', async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt inválido' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-oss-20b:free',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Retorna só o texto gerado pela IA para o frontend
    const aiText = response.data.choices[0].message.content;
    res.json({ aiText });
  } catch (error: any) {
    console.error('Erro na API OpenRouter:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao chamar API de IA' });
  }
});

export default router;
