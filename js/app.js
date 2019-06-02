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

function createNewTask(task) {
    var listItem = document.createElement('li');
    var textItem = document.createElement('div');
    var dateInfo = document.createElement('span');
    var icons = document.createElement('div');
    // var saveEditedTask = document.createElement('span');
    
    var iconsClass = [
        '<i class="fas fa-tag"></i>',
        '<i class="fas fa-palette"></i>',
        '<i class="fas fa-edit edit-task"></i>',
        '<i class="fas fa-check-square"></i>',
        '<i class="fas fa-times-circle delete-task"></i>'
    ]
    
    iconsClass.forEach(function(icon) {
    
        var iconParent = document.createElement('li');
        iconParent.className = 'icon-item';
        iconParent.innerHTML = icon;
        icons.appendChild(iconParent);
        
    });
    
    dateInfo.innerText = formatDate(new Date());
    dateInfo.className = 'task-date';
    textItem.className = 'list-content';
    icons.className = 'action-icons';
    textItem.innerText = task;
    listItem.className = 'list-item';
    // textItem.appendChild(icons);
    listItem.appendChild(textItem);
    // listItem.appendChild(saveEditedTask);
    listItem.appendChild(icons);
    listItem.appendChild(dateInfo);

    return listItem;

};

function addNewTask() {
    var listItem = createNewTask(todoTitle.value);
    todoList.appendChild(listItem);
    todoTitle.value = '';
    
    var deleteTask = document.querySelectorAll('.delete-task');
    
    deleteTask.forEach(function (icon) {
        icon.addEventListener("click", function() {
			this.closest("li.list-item").classList.add("hidden");     
        });
    });
    
    var editTask = document.querySelectorAll('.edit-task');
    
    
    editTask.forEach(function(icon) {
        icon.addEventListener("click", function () {
            var thisParent = this.parentElement.parentElement.previousElementSibling;
            thisParent.contentEditable = true;
            thisParent.style.backgroundColor = "#efefef";
            this.classList.remove("fas", "fa-edit", "edit-task");
            this.classList.add("fas", "fa-check", "fa-2x");
            
            this.addEventListener("click", function () {
                thisParent.contentEditable = false;
                thisParent.style.backgroundColor = "#ffffff";
                this.classList.remove("fas", "fa-check", "fa-2x");
                this.classList.add("fas", "fa-edit", "edit-task");
            })
        })
    })
};

todoTitle.addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && todoTitle.value.length >= 1) {
        addNewTask();
    }
});




