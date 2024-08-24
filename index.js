// Task variables
let taskList = JSON.parse(localStorage.getItem('tasklist')) || [];
let editId = 0;

// Theme variable
let currentTheme = JSON.parse(localStorage.getItem('theme')) || "medium";
document.querySelector('.App').className = `App ${currentTheme}`;

function updateTaskList() {
    const taskListElement = document.getElementById('taskList');
    const taskCountElement = document.getElementById('taskCount');
    taskListElement.innerHTML = '';

    taskList.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <p>
                <span class="name">${task.name}</span>
                <span class="time">${task.time}</span>
            </p>
            <i class="bi bi-pencil-square" onclick="editTask(${task.id})"></i>
            <i class="bi bi-trash" onclick="deleteTask(${task.id})"></i>
        `;
        taskListElement.appendChild(listItem);
    });

    taskCountElement.textContent = taskList.length;
    localStorage.setItem('tasklist', JSON.stringify(taskList));
}

function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput').value;

    if (editId) {
        const taskIndex = taskList.findIndex(task => task.id === editId);
        taskList[taskIndex].name = taskInput;
        taskList[taskIndex].time = new Date().toLocaleString();
        editId = 0;
    } else if (taskInput) {
        taskList.push({
            id: Date.now(),
            name: taskInput,
            time: new Date().toLocaleString()
        });
    }

    document.getElementById('taskInput').value = '';
    updateTaskList();
}

function editTask(id) {
    const task = taskList.find(task => task.id === id);
    document.getElementById('taskInput').value = task.name;
    editId = id;
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    updateTaskList();
}

function clearAllTasks() {
    taskList = [];
    updateTaskList();
}

function setTheme(theme) {
    document.querySelector('.App').className = `App ${theme}`;
    currentTheme = theme;
    localStorage.setItem('theme', JSON.stringify(theme));
}

// Initialize the task list and theme on page load
document.getElementById('taskForm').addEventListener('submit', addTask);
updateTaskList();
