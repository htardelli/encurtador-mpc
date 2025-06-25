import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import { BitlyClient } from 'bitly';

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const bitly  = new BitlyClient(process.env.BITLY_TOKEN);

async function shortenLink(url) {
  const resp = await bitly.shorten(url);
  return resp.link;
}

app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Falta o parâmetro 'url'." });
  }
  try {
    const shortUrl = await shortenLink(url);
    return res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno ao encurtar.' });
  }
});

app.get('/health', (_req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔗 Service listening on port ${PORT}`);
});
