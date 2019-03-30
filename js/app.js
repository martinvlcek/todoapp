'use strict';

let todoTitle = document.querySelector('.title-input');
let todoList = document.querySelector('.todo-list');
let list = document.createElement('li');

todoTitle.addEventListener('keyup', function(event) {
    if (todoTitle) {

        if (event.keyCode === 13) {
            todoList.appendChild(list);
            list.innerHTML = todoTitle.value;
            list.classList.add('animacia');
            todoTitle.value = '';
        }
    }
    
    
})




