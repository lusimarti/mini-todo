const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Tasks API
let tasks = [];

app.get('/tasks', (req, res) => res.json(tasks));
app.post('/tasks', (req, res) => {
  const { text, done } = req.body;
  const newTask = { id: uuidv4(), text, done };
  tasks.push(newTask);
  res.json(newTask);
});
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  tasks = tasks.map(t => t.id === id ? { ...t, done } : t);
  res.json({ success: true });
});
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

// Serve index.html for frontend routes safely
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
