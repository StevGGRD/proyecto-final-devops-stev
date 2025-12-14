const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [
    { id: uuidv4(), title: 'Aprender DevOps', completed: false },
    { id: uuidv4(), title: 'Crear Pipeline CI/CD', completed: false },
    { id: uuidv4(), title: 'Desplegar con Docker', completed: true }
];

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// API
app.get('/api/tasks', (req, res) => res.json({ tasks }));

app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: 'Título requerido' });
    const task = { id: uuidv4(), title, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});

app.patch('/api/tasks/:id/toggle', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: 'No encontrada' });
    task.completed = !task.completed;
    res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    const idx = tasks.findIndex(t => t.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
    tasks.splice(idx, 1);
    res.json({ ok: true });
});

app.delete('/api/tasks/completed', (req, res) => {
    const len = tasks.length;
    tasks = tasks.filter(t => !t.completed);
    res.json({ deleted: len - tasks.length });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Servidor en puerto ${PORT}`));
module.exports = app;