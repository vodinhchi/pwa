document.getElementById('addTodo').addEventListener('click', () => {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value;

    if (todoText) {
        const li = document.createElement('li');
        li.textContent = todoText;
        document.getElementById('todoList').appendChild(li);
        todoInput.value = '';
    }
});

// Đăng ký Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker registered:', registration);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}