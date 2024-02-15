document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    document.getElementById('add-task-btn').addEventListener('click', addTask);
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#tasks li').forEach(taskElement => {
        tasks.push({ text: taskElement.firstChild.textContent, completed: taskElement.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    if (taskText) {
        createTaskElement({ text: taskText, completed: false });
        input.value = '';
        saveTasks();
    }
}

function createTaskElement(task) {
    const tasks = document.getElementById('tasks');
    const li = document.createElement('li');
    const textSpan = document.createElement('span');
    textSpan.textContent = task.text;
    textSpan.contentEditable = true;
    textSpan.onblur = saveTasks; // Save on edit
    li.appendChild(textSpan);

    if (task.completed) {
        li.classList.add('completed');
    }

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent toggle completed
        tasks.removeChild(li);
        saveTasks();
    });

    li.appendChild(deleteBtn);
    tasks.appendChild(li);
}

// Initialize local storage loading and event listeners
loadTasks();
