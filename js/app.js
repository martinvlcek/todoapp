// TODO: add animations (animate.css) for adding & removing tasks
// TODO: bug - broken masonry layout if removing first task
// TODO: change time format for minutes
// TODO: 

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
        '<i class="fas fa-palette change-bgcolor"></i>',
        '<i class="fas fa-edit edit-task"></i>',
        '<i class="fas fa-check-square finish-task"></i>',
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
    textItem.contentEditable = false;
    icons.className = 'action-icons';
    textItem.innerText = task;
    listItem.className = 'list-item grid-item';
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
    
    var deleteTask = listItem.getElementsByClassName('delete-task')[0];
    
    deleteTask.addEventListener("click", function () {
        this.closest("li.list-item").classList.add("hidden");  
        addMasonry();
    });
    
    var editTask = listItem.getElementsByClassName('edit-task')[0];

    editTask.addEventListener("click", function () {
        var thisParent = this.parentElement.parentElement.previousElementSibling;
        switch (thisParent.contentEditable) {
            case "false":
                thisParent.contentEditable = true;
                thisParent.style.backgroundColor = "#efefef";
                this.classList.remove("fas", "fa-edit", "edit-task");
                this.classList.add("fas", "fa-check", "fa-2x");
                break;
            case "true":
                thisParent.contentEditable = false;
                thisParent.style.backgroundColor = listItem.style.backgroundColor;
                this.classList.remove("fas", "fa-check", "fa-2x");
                this.classList.add("fas", "fa-edit", "edit-task");
                break;
        }        
    });

    var changeBgColor = listItem.getElementsByClassName('change-bgcolor')[0];
    var colors = [
        "#FFFFFF",
        "#B6B5B8",
        "#FF8A47",
        "#FC6170",
        "#8CEEEE",
        "#26BFBF",
        "#FFD747",
        "#C0C480",
        "#C06C84"
    ]
    
    var bgColors = document.createElement("div");
    bgColors.className = "bg-colors hidden";

    colors.forEach(function(color) {
        changeBgColor.parentElement.prepend(bgColors);
        var bgIcon = document.createElement("span");
        bgIcon.classList = "bgIconItem";
        changeBgColor.previousElementSibling.appendChild(bgIcon);
        bgIcon.style.backgroundColor = color;
    });

    changeBgColor.addEventListener("click", function() {
        this.previousElementSibling.classList.toggle("hidden");

        var bgIconItem = document.querySelectorAll(".bgIconItem");
        for (var i = 0; i < bgIconItem.length; i++) {
            bgIconItem[i].addEventListener("click", function (itemColor) {
                itemColor = this.style.backgroundColor;
                this.closest("li.list-item").style.backgroundColor = itemColor;
            });
        }

        bgColors.addEventListener("mouseleave", function() {
            this.classList.add("hidden");
        });

    });



    // * FINISH TASK
    var finishTask = listItem.getElementsByClassName('finish-task')[0];

    finishTask.addEventListener("click", function () {
        this.closest("li.list-item").classList.add("task-done");
        this.parentElement.parentElement.style.pointerEvents = "none";
        
    });

    var unfinishTask = listItem.getElementsByClassName("list-content")[0];
    var actionIcons = listItem.getElementsByClassName("action-icons")[0];

    unfinishTask.addEventListener("click", function () {
        
        if (this.parentElement.classList.contains("task-done")) {
            this.parentElement.classList.remove("task-done");
            actionIcons.style.pointerEvents = "auto";            
        }
        
    });

    addMasonry();

};

todoTitle.addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && todoTitle.value.length >= 1) {
        addNewTask();
    }
});

// * CREATE MASONRY LAYOUT
function addMasonry() { 
    var elem = document.querySelector('.grid');
    
    if (elem) { 
        var msnry = new Masonry(elem, {
            itemSelector: '.grid-item',
            gutter: 10,
            horizontalOrder: true,
            fitWidth: true,
            transitionDuration: '0.5s'
        }
    )};

}


