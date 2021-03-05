const inputField = document.getElementById("textInput");
const allBtn = document.querySelectorAll(".allBtn");
const activeBtn = document.querySelectorAll(".activeBtn");
const completedBtn = document.querySelectorAll(".completedBtn");
const clearBtn = document.getElementById("clearBtn");
const activeList = document.getElementById("activeList");
const completedList = document.getElementById("completedList");
const containers = document.querySelectorAll(".container");
let itemsActiveArray = [];
let itemsCompletedArray = [];
let afterElementMob;

//checks if local storage already exists
if (localStorage.getItem("itemsActive")) {
    itemsActiveArray = JSON.parse(localStorage.getItem("itemsActive"));
} else {
    itemsActiveArray = [];
}

if (localStorage.getItem("itemsCompleted")) {
    itemsCompletedArray = JSON.parse(localStorage.getItem("itemsCompleted"));
} else {
    itemsCompletedArray = [];
}

//creates local storage keys and converts its content into a variable
localStorage.setItem("itemsActive", JSON.stringify(itemsActiveArray));
const dataActive = JSON.parse(localStorage.getItem("itemsActive"));
localStorage.setItem("itemsCompleted", JSON.stringify(itemsCompletedArray));
const dataCompleted = JSON.parse(localStorage.getItem("itemsCompleted"));

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
        document.documentElement.style.setProperty("--box-shadow", "rgb(153 153 153 / 30%)");
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
        document.documentElement.style.setProperty("--box-shadow", "rgb(0 0 0 / 30%)");
        document.getElementById("viewModeIcon").src = "images/icon-sun.svg";
        document.getElementById("viewModeIcon").classList.remove("lightMode");
        document.getElementById("viewModeIcon").classList.add("darkMode");
    }
});

//creates new item
function createItem(inputValue) {
    let itemCheckbox = document.createElement("input");
    itemCheckbox.setAttribute("type", "checkbox");
    itemCheckbox.classList.add("checkbox");
    itemCheckbox.setAttribute("onchange", "checkUncheckItem(this)");
    let itemLabel = document.createElement("label");
    itemLabel.textContent = inputValue;
    // itemLabel.classList.add("activeItem");
    itemLabel.classList.add("draggable");
    itemLabel.setAttribute("draggable", "true");
    let lineBreak = document.createElement("br");
    itemLabel.prepend(itemCheckbox);
    // activeList.appendChild(itemLabel);
    createDeleteBtn(itemLabel);
    itemLabel.appendChild(lineBreak);
    countItemsLeft();
    itemLabel.addEventListener("dragstart", dragStart);
    itemLabel.addEventListener("dragend", dragEnd);
    itemLabel.addEventListener("touchstart", touchStart);
    itemLabel.addEventListener("touchmove", touchMove);
    itemLabel.addEventListener("touchend", touchEnd);
    return itemLabel;
}

//adds item to Active List
function addItemActive(itemLabel) {
    itemLabel.classList.add("activeItem");
    activeList.appendChild(itemLabel);
}

//adds item to Completed List
function addItemCompleted(itemLabel) {
    itemLabel.classList.add("completedItem");
    completedList.appendChild(itemLabel);
}

//event listener for "Enter" key when typing in input field
inputField.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (inputField.value === "") {
            alert("You must write something!");
        } else {
            itemsActiveArray.push(inputField.value);
            localStorage.setItem("itemsActive", JSON.stringify(itemsActiveArray));
            let itemLabel = createItem(inputField.value);
            addItemActive(itemLabel);
            inputField.value = "";
        }
    }
});

//displays localStorage data on the front-end
dataActive.forEach((item) => {
    let itemLabel = createItem(item);
    addItemActive(itemLabel);
});

dataCompleted.forEach((item) => {
    let itemLabel = createItem(item);
    addItemCompleted(itemLabel);
});

//button functions to show/hide lists
allBtn.forEach((btn) => {
    btn.onclick = function() {
        activeList.style.display = "block";
        completedList.style.display = "block";
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
        activeList.style.display = "block";
        completedList.style.display = "none";
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
        activeList.style.display = "none";
        completedList.style.display = "block";
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
        let index = itemsActiveArray.indexOf(itemLabel.textContent);
        itemsActiveArray.splice(index, 1);
        localStorage.setItem("itemsActive", JSON.stringify(itemsActiveArray));
        activeList.removeChild(itemLabel);
        itemLabel.classList.toggle("activeItem");
        itemsCompletedArray.push(itemLabel.textContent);
        localStorage.setItem("itemsCompleted", JSON.stringify(itemsCompletedArray));
        completedList.appendChild(itemLabel);
        itemLabel.classList.toggle("completedItem");
        countItemsLeft();
    } else {
        let index = itemsCompletedArray.indexOf(itemLabel.textContent);
        itemsCompletedArray.splice(index, 1);
        localStorage.setItem("itemsCompleted", JSON.stringify(itemsCompletedArray));
        completedList.removeChild(itemLabel);
        itemLabel.classList.toggle("completedItem");
        itemsActiveArray.push(itemLabel.textContent);
        localStorage.setItem("itemsActive", JSON.stringify(itemsActiveArray));
        activeList.appendChild(itemLabel);
        itemLabel.classList.toggle("activeItem");
        countItemsLeft();
    }
}

//creates a delete button for each item
function createDeleteBtn(itemLabel) {
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    itemLabel.appendChild(deleteBtn);
    deleteItem(deleteBtn, itemLabel);
}

//deletes item
function deleteItem(deleteBtn, itemLabel) {
    deleteBtn.onclick = function() {
        if (itemLabel.classList.contains("activeItem")) {
            for (let i = 0; i < itemsActiveArray.length; i++) {
                let value = itemsActiveArray[i];
                if (value == itemLabel.textContent) {
                    itemsActiveArray.splice(i, 1);
                    localStorage.setItem("itemsActive", JSON.stringify(itemsActiveArray));
                    itemLabel.parentNode.removeChild(itemLabel);
                    countItemsLeft();
                    break;
                }
            }
        } else {
            for (let i = 0; i < itemsCompletedArray.length; i++) {
                let value = itemsCompletedArray[i];
                if (value == itemLabel.textContent) {
                    itemsCompletedArray.splice(i, 1);
                    localStorage.setItem("itemsCompleted", JSON.stringify(itemsCompletedArray));
                    itemLabel.parentNode.removeChild(itemLabel);
                    countItemsLeft();
                    break;
                }
            }
        }
    }
}

//Clear Completed button function
clearBtn.onclick = function() {
    let allCompletedItems = document.querySelectorAll(".completedItem");
    localStorage.removeItem("itemsCompleted");
    itemsCompletedArray = [];
    for (let i = 0; i < allCompletedItems.length; i++) {
        completedList.removeChild(allCompletedItems[i]);
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

//drag and drop functions for mobile
function touchStart(event) {
    event.currentTarget.classList.add("dragging");
}

function touchMove(event) {
    let draggable = document.querySelector(".dragging");
    let container;
    if (draggable.classList.contains("activeItem")) {
        container = activeList;
    } else {
        container = completedList;
    }
    afterElementMob = getDragAfterElement(container, event.touches[0].clientY);
}

function touchEnd(event) {
    let draggable = document.querySelector(".dragging");
    if (afterElementMob == null) {
        if (draggable.classList.contains("activeItem")) {
            activeList.appendChild(draggable);
        } else {
            completedList.appendChild(draggable);
        }
    } else {
        if (draggable.classList.contains("activeItem")) {
            console.log(afterElementMob);
            activeList.insertBefore(draggable, afterElementMob);
        } else {
            console.log(afterElementMob);
            completedList.insertBefore(draggable, afterElementMob);
        }    
    }
    event.currentTarget.classList.remove("dragging");
}