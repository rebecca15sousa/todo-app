let inputField = document.getElementById("textInput");

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

inputField.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        createItem();
    }
});