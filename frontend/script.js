const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    fetch(`${API_URL}/tasks`)
        .then(r => r.json())
        .then(d => {
            renderTasks(d.tasks || []);
            updateStats(d.tasks || []);
            document.getElementById('status').textContent = '✅ Conectado';
        })
        .catch(() => {
            document.getElementById('status').textContent = '❌ Error';
        });
}

function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(t => {
        const li = document.createElement('li');
        li.className = `task-item ${t.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${t.completed ? 'checked' : ''}
                    onchange="toggleTask('${t.id}')">
            <span class="task-text">${t.title}</span>
            <button class="delete-btn" onclick="deleteTask('${t.id}')">X</button>
        `;
        list.appendChild(li);
    });
}

function updateStats(tasks) {
    const total = tasks.length;
    const comp = tasks.filter(t => t.completed).length;
    document.getElementById('total').textContent = total;
    document.getElementById('completed').textContent = comp;
    document.getElementById('pending').textContent = total - comp;
}

function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    }).then(() => { input.value = ''; loadTasks(); });
}

function toggleTask(id) {
    fetch(`${API_URL}/tasks/${id}/toggle`, { method: 'PATCH' }).then(() => loadTasks());
}

function deleteTask(id) {
    if (confirm('¿Eliminar tarea?')) {
        fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' }).then(() => loadTasks());
    }
}

function clearCompleted() {
    fetch(`${API_URL}/tasks/completed`, { method: 'DELETE' }).then(() => loadTasks());
}

document.getElementById('taskInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});