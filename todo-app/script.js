const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

const taskData = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTask = {};

const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, "");
};

const addOrUpdateTask = () => {
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }
  //need to check if task already exists
  const sameTaskIdx = taskData.findIndex((item) => item.id === currentTask.id);
  let taskObj = {
    id: `${removeSpecialChars(titleInput.value).trim().toLowerCase().split(" ").join("-")}-${Date.now()}`, //tomake id unique
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  console.log(taskObj);
  //if not present, add
  if (sameTaskIdx === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[sameTaskIdx] = taskObj;
  }
  localStorage.setItem("tasks", JSON.stringify(taskData));
  updateTaskContainer();
  resetForm();
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
    <div class="task" id=${id}>
    <p><strong>Title: </strong>${title}</p>
    <p><strong>Date: </strong>${date}</p>
    <p><strong>Description:</strong>${description}</p>
    <button class="btn" type="button" onClick="editTask(this)">Edit</button>
    <button class="btn" type="button" onClick="deleteTask(this)">Delete</button>
    </div>`;
  });
};

//edit and delete btn
const deleteTask = (btnEle) => {
  const idx = taskData.findIndex((item) => item.id === btnEle.parentElement.id);
  //remove from arr
  taskData.splice(idx, 1);
  localStorage.setItem("tasks", JSON.stringify(taskData));
  //remove from display
  btnEle.parentElement.remove();
};

const editTask = (btnEle) => {
  const idx = taskData.findIndex((item) => item.id === btnEle.parentElement.id);
  currentTask = taskData[idx];
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;
  addOrUpdateTaskBtn.innerText = "Update Task";
  taskForm.classList.toggle("hidden");
};

const resetForm = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
};

if (taskData.length) {
  updateTaskContainer();
}

//1. open the task form on click
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden");
});

closeTaskFormBtn.addEventListener("click", () => {
  resetForm();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});