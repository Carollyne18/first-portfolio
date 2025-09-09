// Calculator functionality
let calcExpression = '0';
let shouldResetDisplay = false;

function updateCalcDisplay() {
    document.getElementById('calcDisplay').textContent = calcExpression;
}

function appendToCalc(value) {
    if (shouldResetDisplay) {
        calcExpression = '';
        shouldResetDisplay = false;
    }
    
    if (calcExpression === '0' && value !== '.') {
        calcExpression = value;
    } else {
        calcExpression += value;
    }
    updateCalcDisplay();
}

function clearCalc() {
    calcExpression = '0';
    updateCalcDisplay();
}

function deleteLastCalc() {
    if (calcExpression.length > 1) {
        calcExpression = calcExpression.slice(0, -1);
    } else {
        calcExpression = '0';
    }
    updateCalcDisplay();
}

function calculateResult() {
    try {
        const result = eval(calcExpression.replace('×', '*'));
        calcExpression = result.toString();
        shouldResetDisplay = true;
        updateCalcDisplay();
    } catch (error) {
        calcExpression = 'Error';
        shouldResetDisplay = true;
        updateCalcDisplay();
    }
}

// Weather functionality
const weatherStates = [
    { icon: '☀️', temp: '24°C', desc: 'Sunny Day' },
    { icon: '🌧️', temp: '18°C', desc: 'Rainy' },
    { icon: '❄️', temp: '-2°C', desc: 'Snowy' },
    { icon: '⛅', temp: '21°C', desc: 'Partly Cloudy' },
    { icon: '⛈️', temp: '16°C', desc: 'Thunderstorm' }
];
let currentWeatherIndex = 0;

function changeWeather() {
    currentWeatherIndex = (currentWeatherIndex + 1) % weatherStates.length;
    const weather = weatherStates[currentWeatherIndex];
    
    document.getElementById('weatherIcon').textContent = weather.icon;
    document.getElementById('temperature').textContent = weather.temp;
    document.getElementById('weatherDesc').textContent = weather.desc;
}

// Todo functionality
let todos = [];
let todoIdCounter = 0;

function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    if (todoText) {
        const todo = {
            id: todoIdCounter++,
            text: todoText,
            completed: false
        };
        
        todos.push(todo);
        input.value = '';
        renderTodos();
        updateProgressStats();
    }
}

function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    updateProgressStats();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
    updateProgressStats();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = todos.map(todo => `
        <div class="todo-item">
            <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}; opacity: ${todo.completed ? '0.6' : '1'}">
                ${todo.text}
            </span>
            <div>
                <button class="btn" onclick="toggleTodo(${todo.id})" style="padding: 0.3rem 0.8rem; margin-right: 0.5rem;">
                    ${todo.completed ? '↩️' : '✓'}
                </button>
                <button class="btn danger" onclick="removeTodo(${todo.id})" style="padding: 0.3rem 0.8rem;">×</button>
            </div>
        </div>
    `).join('');
}

function clearAllTodos() {
    if (todos.length > 0 && confirm('Are you sure you want to clear all todos?')) {
        todos = [];
        renderTodos();
        updateProgress
