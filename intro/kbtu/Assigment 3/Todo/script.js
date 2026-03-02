const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const filterGroup = document.getElementById("filterGroup");

let currentFilter = "all";

function createTodoItem(text) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(deleteButton);

    return listItem;
}

function applyFilter(filter) {
    currentFilter = filter;

    const items = todoList.querySelectorAll(".todo-item");
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const isCompleted = item.classList.contains("is-completed");

        let shouldShow = true;
        if (filter === "active") shouldShow = !isCompleted;
        if (filter === "completed") shouldShow = isCompleted;

        item.classList.toggle("is-hidden", !shouldShow);
    }
}

function setActiveFilterButton(filter) {
    const buttons = filterGroup.querySelectorAll(".filter-btn");
    for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        btn.classList.toggle("is-active", btn.dataset.filter === filter);
    }
}

function addTodoItem() {
    const value = todoInput.value.trim();
    if (value === "") return;

    const todoItem = createTodoItem(value);
    todoList.appendChild(todoItem);

    todoInput.value = "";
    todoInput.focus();

    applyFilter(currentFilter);
}

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodoItem();
});

todoList.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("delete-button")) {
        const item = target.closest(".todo-item");
        if (item) todoList.removeChild(item);
        return;
    }
});

todoList.addEventListener("change", function (event) {
    const target = event.target;

    if (target.classList.contains("todo-checkbox")) {
        const item = target.closest(".todo-item");
        if (!item) return;

        item.classList.toggle("is-completed", target.checked);
        applyFilter(currentFilter);
    }
});

filterGroup.addEventListener("click", function (event) {
    const btn = event.target.closest(".filter-btn");
    if (!btn) return;

    const filter = btn.dataset.filter;
    setActiveFilterButton(filter);
    applyFilter(filter);
});

const json = '{"users":[{"age":18},{"age":21},{"age":16}]}';
const obj = JSON.parse(json)
let morethan18 = obj.users.filter(function (user){
    return user.age >= 18;
})