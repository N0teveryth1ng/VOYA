const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/api/groq', async (req, res) => {
  const key = process.env.GROQ_KEY;
  if (!key) return res.status(500).json({ error: 'GROQ_KEY not configured on server' });
  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify(req.body)
    });
    const data = await upstream.json();
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Voya running on port ${port}`));
