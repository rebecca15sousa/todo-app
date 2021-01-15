let inputField = document.getElementById("textInput");
let allBtn = document.getElementById("allBtn");
let activeBtn = document.getElementById("activeBtn");
let completedBtn = document.getElementById("completedBtn");
let clearBtn = document.getElementById("clearBtn");


// function createItem() {
//     let newItem = document.createElement("li");
//     let inputValue = document.getElementById("textInput").value;
//     newItem.textContent = inputValue;
//     let checkBtn = document.createElement("button");
//     if (inputValue === "") {
//         alert("You must write something!");
//     } else {
//         document.getElementById("activeList").appendChild(checkBtn);
//         document.getElementById("activeList").appendChild(newItem);
//     }
//     document.getElementById("textInput").value = "";
// }

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
    let lineBreak = document.createElement("br");
    if (inputValue === "") {
        alert("You must write something!");
    } else {
        itemLabel.prepend(itemCheckbox);
        document.getElementById("activeList").appendChild(itemLabel);
        createDeleteBtn(itemLabel);
        itemLabel.appendChild(lineBreak);
        countItemsLeft();
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
allBtn.onclick = function() {
    //document.getElementById("allList").style.display = "block";
    document.getElementById("activeList").style.display = "block";
    document.getElementById("completedList").style.display = "block";
}

activeBtn.onclick = function() {
    //document.getElementById("allList").style.display = "none";
    document.getElementById("activeList").style.display = "block";
    document.getElementById("completedList").style.display = "none";
}

completedBtn.onclick = function() {
    //document.getElementById("allList").style.display = "none";
    document.getElementById("activeList").style.display = "none";
    document.getElementById("completedList").style.display = "block";
}

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