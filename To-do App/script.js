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
//1. open the task form on click
openTaskFormBtn.addEventListener("click", () =>
{
    taskForm.classList.toggle("hidden");
});

//2. close task form
closeTaskFormBtn.addEventListener("click", () =>
{
    taskForm.classList.toggle("hidden");
})

//store tasks in local storage
taskForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    addOrUpdateTask();
})

const addOrUpdateTask = () => {
    //need to check if task already exists
    const sameTaskIdx = taskData.findIndex((item)=>item.id===currentTask.id);
    const taskObj = {
        id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`, //tomake id unique
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    }
    //if not present, add
    if (sameTaskIdx === -1) {
    taskData.unshift(taskObj);
    }
    updateTaskContainer();
    //need to clear the task form after add
    resetForm();
}

const updateTaskContainer = () => {
    taskData.forEach(({id, title, date, description})=> {
    tasksContainer.innerHTML += `
    <div class="task" id=${id}>
    <p><strong>Title: </strong>${title}</p>
    <p><strong>Date: </strong>${date}</p>
    <p><strong>Description:</strong>${description}</p>
    <button class="btn" type="button" onClick="editTask(this)">Edit</button>
    <button class="btn" type="button" onClick="deleteTask(this)">Delete</button>
    </div>`
});
    
    
}

const resetForm = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

//edit and delete btn 


