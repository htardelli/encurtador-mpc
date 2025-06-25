import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/shorten-tiny', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Falta o parâmetro 'url'." });
  try {
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const shortUrl = await response.text();
    res.json({ shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no TinyURL.' });
  }
});

app.get('/health', (_req, res) => res.send('OK'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🔗 TinyURL service on port ${PORT}`));

