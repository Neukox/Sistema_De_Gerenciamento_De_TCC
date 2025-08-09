import axios from "axios";
import dotenv from "dotenv";


async function chamarIA() {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",
        messages: [
          { role: "user", content: "What is the meaning of life?" }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Resposta da IA:", response.data);
  } catch (error) {
    console.error("Erro ao chamar IA:", error.response?.data || error.message);
  }
}

chamarIA();
