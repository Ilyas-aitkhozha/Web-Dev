const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

function createTodoItem(text) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    checkbox.addEventListener("change", function () {
        listItem.classList.toggle("done", checkbox.checked);
    });

    deleteButton.addEventListener("click", function () {
        todoList.removeChild(listItem);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(deleteButton);

    return listItem;
}

function addTodoItem() {
    const value = todoInput.value.trim();
    if (value === "") return;

    const todoItem = createTodoItem(value);
    todoList.appendChild(todoItem);

    todoInput.value = "";
}

addButton.addEventListener("click", addTodoItem);

todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTodoItem();
    }
});
