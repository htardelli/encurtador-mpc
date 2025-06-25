const functions = [
  {
    name: "shorten_link",
    description: "Encurta uma URL usando o Bitly",
    parameters: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "A URL completa a ser encurtada"
        }
      },
      required: ["url"]
    }
  }
];

// Função que efetivamente chama a API do Bitly
async function shortenLink(url) {
  const resp = await bitly.shorten(url);
  return resp.link;
}


// 1) Carrega .env
import 'dotenv/config';

// 2) Importe o default export do SDK OpenAI
import OpenAI from 'openai';

// 3) Importe o cliente Bitly
import { BitlyClient } from 'bitly';

// 4) Inicialize OpenAI (v4+)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

// 5) Inicialize Bitly
const bitly = new BitlyClient(process.env.BITLY_TOKEN);

// 6) Verificação rápida
console.log('▶️ Ambiente OK:', {
  OPENAI: !!process.env.OPENAI_KEY,
  BITLY:  !!process.env.BITLY_TOKEN
});

// 7) Função de teste
async function run() {
  try {
    const resp = await bitly.shorten('https://www.voeazul.com.br');
    console.log('Link encurtado:', resp.link);
  } catch (err) {
    console.error('Erro ao encurtar:', err);
  }
}

// 8) Execute o teste
run();
