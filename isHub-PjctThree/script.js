// --- STATE MANAGEMENT ---
let tasks = [];
let currentFilter = 'all';

// --- DOM ELEMENTS ---
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const showAllBtn = document.getElementById('showAllBtn');
const showActiveBtn = document.getElementById('showActiveBtn');
const showDoneBtn = document.getElementById('showDoneBtn');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');
const clearDoneBtn = document.getElementById('clearDoneBtn');

// --- CORE FUNCTIONS ---

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
    // 1. Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.done;
        if (currentFilter === 'done') return task.done;
        return true;
    });

    // 2. Build task list dynamically
    taskList.innerHTML = '';
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.done) {
            li.classList.add('task-done');
        }

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="actions">
                <button class="toggle-btn" data-id="${task.id}">${task.done ? 'Undo' : 'Done'}</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    // 3. Update counter
    const activeTasks = tasks.filter(task => !task.done).length;
    counter.textContent = `${activeTasks} active / ${tasks.length} total`;

    // 4. Save state
    saveTasks();
}

// --- HANDLERS ---

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        done: false
    };

    tasks.push(newTask);
    taskInput.value = '';
    render();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        render();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

function clearDone() {
    tasks = tasks.filter(task => !task.done);
    render();
}

// --- EVENT LISTENERS ---

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

showAllBtn.addEventListener('click', () => { currentFilter = 'all'; render(); });
showActiveBtn.addEventListener('click', () => { currentFilter = 'active'; render(); });
showDoneBtn.addEventListener('click', () => { currentFilter = 'done'; render(); });

clearDoneBtn.addEventListener('click', clearDone);

// Handle dynamic clicks inside list
taskList.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('toggle-btn')) {
        toggleTask(id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTask(id);
    }
});

// Initial run
loadTasks();
render();