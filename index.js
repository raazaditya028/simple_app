const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'a and b must be numbers' });
  }
  res.json({ result: a + b });
});

// Items endpoints using in-memory DB
app.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const item = db.add({ name });
  res.status(201).json(item);
});

app.get('/items', (req, res) => {
  res.json(db.all());
});

module.exports = app;
