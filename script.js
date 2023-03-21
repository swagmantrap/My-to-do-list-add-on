let taskList = document.getElementById("task-list");
let newTask = document.getElementById("new-task");
let addTaskButton = document.getElementById("add-task");

// load saved tasks from storage
chrome.storage.local.get(["tasks"], function(result) {
  if (result.tasks) {
    taskList.innerHTML = result.tasks;
  }
});

// save tasks to storage
function saveTasks() {
  chrome.storage.local.set({ "tasks": taskList.innerHTML });
}

// add new task to the list
function addTask(event) {
  event.preventDefault();
  let taskText = newTask.value;
  if (taskText.trim()) {
    let listItem = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    let taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTask);
    listItem.appendChild(checkbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    newTask.value = "";
    saveTasks();
  }
}

// delete task from the list
function deleteTask(event) {
  let listItem = event.target.parentNode;
  taskList.removeChild(listItem);
  saveTasks();
}

// listen for add button click event
addTaskButton.addEventListener("click", addTask);

// listen for enter key press event
newTask.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask(event);
  }
});
