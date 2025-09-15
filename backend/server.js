const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve frontend from ../frontend
app.use(express.static(path.join(__dirname, '../frontend')));

let tasks = [];

// API routes
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
    tasks = tasks.map(task => task.id === id ? { ...task, done } : task);
    res.json({ success: true });
});
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
