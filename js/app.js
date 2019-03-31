'use strict';

var todoTitle = document.querySelector('.title-input');
var todoList = document.querySelector('.todo-list');

var createNewTask = function(task) {
    var listItem = document.createElement('li');
    var textItem = document.createElement('span');

    textItem.innerText = task;
    listItem.appendChild(textItem);

    return listItem;
};

var addNewTask = function() {
    var listItem = createNewTask(todoTitle.value);
    todoList.appendChild(listItem);
    listItem.classList.add('animacia');
    todoTitle.value = '';
}

todoTitle.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        addNewTask();
    }
})




