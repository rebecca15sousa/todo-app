let inputField = document.getElementById("textInput");
let allBtn = document.querySelectorAll(".allBtn");
let activeBtn = document.querySelectorAll(".activeBtn");
let completedBtn = document.querySelectorAll(".completedBtn");
let clearBtn = document.getElementById("clearBtn");
let activeList = document.getElementById("activeList");
let completedList = document.getElementById("completedList");
const containers = document.querySelectorAll(".container");

//toggle between light and dark mode
document.getElementById("viewModeIcon").addEventListener("click", function(event) {
    if (document.getElementById("viewModeIcon").classList.contains("darkMode")) {
        document.documentElement.style.setProperty("--background-image", "url(images/bg-desktop-light.jpg)");
        document.documentElement.style.setProperty("--background-image-mobile", "url(images/bg-mobile-light.jpg)");
        document.documentElement.style.setProperty("--background-colour", "hsl(236, 33%, 92%)");
        document.documentElement.style.setProperty("--list-colour", "hsl(0, 0%, 98%)");
        document.documentElement.style.setProperty("--active-text-colour", "hsl(235, 19%, 35%)");
        document.documentElement.style.setProperty("--completed-text-colour", "hsl(233, 11%, 84%)");
        document.documentElement.style.setProperty("--buttons-footer-colour", "hsl(236, 9%, 61%)");
        document.documentElement.style.setProperty("--buttons-hover-colour", "hsl(235, 19%, 35%)");
        document.documentElement.style.setProperty("--border-colour", "hsl(233, 11%, 84%)");
        document.getElementById("viewModeIcon").src = "images/icon-moon.svg";
        document.getElementById("viewModeIcon").classList.remove("darkMode");
        document.getElementById("viewModeIcon").classList.add("lightMode");
    } else {
        document.documentElement.style.setProperty("--background-image", "url(images/bg-desktop-dark.jpg)");
        document.documentElement.style.setProperty("--background-image-mobile", "url(images/bg-mobile-dark.jpg)");
        document.documentElement.style.setProperty("--background-colour", "hsl(235, 21%, 11%)");
        document.documentElement.style.setProperty("--list-colour", "hsl(235, 24%, 19%)");
        document.documentElement.style.setProperty("--active-text-colour", "hsl(234, 39%, 85%)");
        document.documentElement.style.setProperty("--completed-text-colour", "hsl(234, 11%, 52%)");
        document.documentElement.style.setProperty("--buttons-footer-colour", "hsl(234, 11%, 52%)");
        document.documentElement.style.setProperty("--buttons-hover-colour", "hsl(236, 33%, 92%)");
        document.documentElement.style.setProperty("--border-colour", "hsl(233, 14%, 35%)");
        document.getElementById("viewModeIcon").src = "images/icon-sun.svg";
        document.getElementById("viewModeIcon").classList.remove("lightMode");
        document.getElementById("viewModeIcon").classList.add("darkMode");
    }
});

//adds new item to Active List
function createItem() {
    let itemCheckbox = document.createElement("input");
    itemCheckbox.setAttribute("type", "checkbox");
    itemCheckbox.classList.add("checkbox");
    itemCheckbox.setAttribute("onchange", "checkUncheckItem(this)");
    let inputValue = document.getElementById("textInput").value;
    let itemLabel = document.createElement("label");
    itemLabel.textContent = inputValue;
    itemLabel.classList.add("activeItem");
    itemLabel.classList.add("draggable");
    itemLabel.setAttribute("draggable", "true");
    let lineBreak = document.createElement("br");
    if (inputValue === "") {
        alert("You must write something!");
    } else {
        itemLabel.prepend(itemCheckbox);
        document.getElementById("activeList").appendChild(itemLabel);
        createDeleteBtn(itemLabel);
        itemLabel.appendChild(lineBreak);
        countItemsLeft();
        itemLabel.addEventListener("dragstart", dragStart);
        itemLabel.addEventListener("dragend", dragEnd);
    }
    document.getElementById("textInput").value = "";
}

//event listener for "Enter" key when typing in input field
inputField.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        createItem();
    }
});

//button functions to show/hide lists
allBtn.forEach((btn) => {
    btn.onclick = function() {
        document.getElementById("activeList").style.display = "block";
        document.getElementById("completedList").style.display = "block";
        btn.setAttribute("aria-pressed", "true");
        activeBtn.forEach((btn) => {
            btn.setAttribute("aria-pressed", "false");
        });
        completedBtn.forEach((btn) => {
            btn.setAttribute("aria-pressed", "false");
        });
    }
});

activeBtn.forEach((btn) => {
    btn.onclick = function() {
        document.getElementById("activeList").style.display = "block";
        document.getElementById("completedList").style.display = "none";
        btn.setAttribute("aria-pressed", "true");
        allBtn.forEach((btn) => {
            btn.setAttribute("aria-pressed", "false");
        });
        completedBtn.forEach((btn) => {
            btn.setAttribute("aria-pressed", "false");
        });
    }
});

completedBtn.forEach((btn) => {
    btn.onclick = function() {
        document.getElementById("activeList").style.display = "none";
        document.getElementById("completedList").style.display = "block";
        btn.setAttribute("aria-pressed", "true");
        allBtn.forEach((btn) => {
            btn.setAttribute("aria-pressed", "false");
        });
        activeBtn.forEach((btn) => {
            btn.setAttribute("aria-pressed", "false");
        });
    }
});

//marks/unmarks items as completed
function checkUncheckItem(item) {
    let itemLabel = item.parentNode;
    if (item.checked) {
        document.getElementById("activeList").removeChild(itemLabel);
        itemLabel.classList.toggle("activeItem");
        document.getElementById("completedList").appendChild(itemLabel);
        itemLabel.classList.toggle("completedItem");
        countItemsLeft();
    } else {
        document.getElementById("completedList").removeChild(itemLabel);
        itemLabel.classList.toggle("completedItem");
        document.getElementById("activeList").appendChild(itemLabel);
        itemLabel.classList.toggle("activeItem");
        countItemsLeft();
    }
}

//creates a delete button for each item
function createDeleteBtn(itemLabel) {
    let deleteBtn = document.createElement("button");
    // deleteBtn.textContent = "close";
    deleteBtn.classList.add("deleteBtn");
    itemLabel.appendChild(deleteBtn);
    deleteItem(deleteBtn, itemLabel);
}

//deletes item from DOM
function deleteItem(deleteBtn, itemLabel) {
    deleteBtn.onclick = function() {
        itemLabel.parentNode.removeChild(itemLabel);
        countItemsLeft();
    }
}

//Clear Completed button function
clearBtn.onclick = function() {
    let allCompletedItems = document.querySelectorAll(".completedItem");
    for (let i = 0; i < allCompletedItems.length; i++) {
        document.getElementById("completedList").removeChild(allCompletedItems[i]);
    }
}

//counts how many items are in the Active List
function countItemsLeft() {
    let dynamicNumber = document.getElementById("dynamicNumber");
    let counter = 0;
    let allActiveItems = document.querySelectorAll(".activeItem");
    for (let i = 0; i < allActiveItems.length; i++) {
        counter++;
    }
    dynamicNumber.textContent = counter;
}

//drag and drop functions for items
function dragStart(event) {
    event.target.classList.add("dragging");
}

function dragEnd(event) {
    event.target.classList.remove("dragging");
}

//drag and drop functions for containers
containers.forEach(dragAndDropCont);

function dragAndDropCont(container) {
    let afterElement;
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", drop);
}

function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add("dragOver");
}

function dragOver(event) {
    event.preventDefault();
    event.target.classList.add("dragOver");
    let draggable = document.querySelector(".dragging");
    let container;
    if (draggable.classList.contains("activeItem")) {
        container = activeList;
    } else {
        container = completedList;
    }
    afterElement = getDragAfterElement(container, event.clientY);
}

function dragLeave(event) {
    event.target.classList.remove("dragOver");
}

function drop(event) {
    event.target.classList.remove("dragOver");
    let draggable = document.querySelector(".dragging");
    if (afterElement == null) {
        if (draggable.classList.contains("activeItem")) {
            activeList.appendChild(draggable);
        } else {
            completedList.appendChild(draggable);
        }
    } else {
        if (draggable.classList.contains("activeItem")) {
            activeList.insertBefore(draggable, afterElement);
        } else {
            completedList.insertBefore(draggable, afterElement);
        }    
    }
}

function getDragAfterElement(container, y) {
    let draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
    return draggableElements.reduce((closest, child) => {
        let box = child.getBoundingClientRect();
        let offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}