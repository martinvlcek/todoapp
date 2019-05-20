'use strict';

var todoTitle = document.querySelector('.title-input');
var todoList = document.querySelector('.todo-list');

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var mins = date.getMinutes();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + hours + ':' + mins;
}

var createNewTask = function(task) {
    var listItem = document.createElement('li');
    var textItem = document.createElement('div');
    var dateInfo = document.createElement('span');
    

    dateInfo.innerText = formatDate(new Date());
    dateInfo.className = 'task-date';
    textItem.className = 'list-content';
    textItem.innerText = task;
    listItem.appendChild(textItem);
    listItem.appendChild(dateInfo);

    return listItem;
};

var addNewTask = function() {
    var listItem = createNewTask(todoTitle.value);
    todoList.appendChild(listItem);
    // listItem.classList.add('animacia');
    todoTitle.value = '';
}

todoTitle.addEventListener('keyup', function(event) {
    if (event.keyCode === 13 && todoTitle.value.length >= 1) {
        addNewTask();
    }
})




