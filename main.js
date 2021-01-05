let inputField = document.getElementById("textInput");
let allBtn = document.getElementById("allBtn");
let activeBtn = document.getElementById("activeBtn");
let completedBtn = document.getElementById("completedBtn");

//adds new item to Active List
function createItem() {
    let newItem = document.createElement("li");
    let inputValue = document.getElementById("textInput").value;
    newItem.textContent = inputValue;
    if (inputValue === "") {
        alert("You must write something!");
    } else {
        document.getElementById("activeList").appendChild(newItem);
    }
    document.getElementById("textInput").value = "";
}

//event listener for "Enter" key when typing in input field
inputField.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        createItem();
    }
});

//functions to show/hide lists
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