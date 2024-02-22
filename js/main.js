const root = document.querySelector(":root");

const modal = document.getElementById("modal");
const statusInput = document.getElementById("status");
const categoryInput = document.getElementById("category");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const searchInput = document.getElementById("searchInput");

const updateBtn = document.getElementById("updateBtn");
const addBtn = document.getElementById("addBtn");
const newTaskBtn = document.getElementById("newTask");

const titleRegex = /^[A-Z][a-z]{3,10}$/;
const descRegex = /\w{5,100}/;

const taskContainer = document.querySelectorAll(".tasks");
const sections = document.querySelectorAll("section");
const barsBtn = document.getElementById("barsBtn");
const gridBtn = document.getElementById("gridBtn");

const modeBtn = document.getElementById("mode");
var remainingCounterElement = document.getElementById("remainingCounter");


let updateIndex;

let containers = {
  nextUp: document.getElementById("nextUp"),
  inProgress: document.getElementById("inProgress"),
  done: document.getElementById("done"),
};
let counters = {
  nextUp: document.querySelector("#nextUp").querySelector("span"),
  inProgress: document.querySelector("#inProgress").querySelector("span"),
  done: document.querySelector("#done").querySelector("span"),
};

let taskList = getTasksFromLocal();
displayAllTasks();

function showModal() {
  scroll(0, 0);
  modal.classList.remove("d-none");
  document.body.style.overflow = "hidden ";
}
// ? 2  ways to hide modal

function hideModal() {
  modal.classList.add("d-none");
  document.body.style.overflow = "auto";
}

function addTask() {
  if (
    validate(titleInput, titleRegex) &&
    validate(descriptionInput, descRegex)
  ) {
    let task = {
      status: statusInput.value,
      category: categoryInput.value,
      title: titleInput.value,
      desc: descriptionInput.value,
      bgColor: "var(--main-black)",
    };
    taskList.push(task);
    setTasksToLocal();
    displayTask(taskList.length - 1);
    hideModal();
  }
  // console.log({ task });
}

function setCounter(status) {
  counters[status].innerHTML = +counters[status].innerHTML + 1;
}

function displayTask(index) {
  let taskHTML = ``;
  taskHTML += `<div class="task" style="background-color:${taskList[index].bgColor}">
  <h3 class="text-capitalize">${taskList[index].title}</h3>
  <p class="descrition  text-capitalizes">${taskList[index].desc}</p>
  <h4 class="category ${taskList[index].category} text-capitalize">${taskList[index].category}</h4>
  <ul class="task-options list-unstyled d-flex gap-3 fs-5 m-0 ">
  <li><i class="bi bi-pencil-square" onclick="getTaskInfo(${index})"></i></li>
  <li><i class="bi bi-trash-fill" onclick="deleteTask(${index})"></i></li>
  <li><i class="bi bi-palette-fill" onclick="changBgColor(event,${index})"></i></li>
  </ul>
  </div>`;
  // console.log(taskHTML);
  containers[taskList[index].status].querySelector(".tasks").innerHTML +=
    taskHTML;

  setCounter(taskList[index]?.status);
}

function displayAllTasks() {
  for (let i = 0; i < taskList.length; i++) {
    displayTask(i);
  }
}

function deleteTask(index) {
  taskList.splice(index, 1);
  setTasksToLocal();
  resetContainers();
  resetCounter();
  displayAllTasks();
}

function resetContainers() {
  //loop in object
  for (let key in containers) {
    containers[key].querySelector(".tasks").innerHTML = "";
  }
}

function resetCounter() {
  //loop in object
  for (let key in counters) {
    counters[key].innerHTML = 0;
  }
}

function searchTask() {
  resetContainers();
  resetCounter();
  var term = searchInput.value;
  for (var i = 0; i < taskList.length; i++) {
    if (
      taskList[i].title.toLowerCase().includes(term.toLowerCase()) ||
      taskList[i].category.toLowerCase().includes(term.toLowerCase())
    ) {
      displayTask(i);
    }
  }
}

function setTasksToLocal() {
  localStorage.setItem("Tasks", JSON.stringify(taskList));
}

function getTasksFromLocal() {
  return JSON.parse(localStorage.getItem("Tasks")) || [];
}

function getTaskInfo(idx) {
  updateIndex = idx;
  showModal();
  statusInput.value = taskList[idx].status;
  categoryInput.value = taskList[idx].category;
  titleInput.value = taskList[idx].title;
  descriptionInput.value = taskList[idx].desc;

  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
}

function editTask() {
  //get user data
  taskList[updateIndex].status = statusInput.value;
  taskList[updateIndex].category = categoryInput.value;
  taskList[updateIndex].title = titleInput.value;
  taskList[updateIndex].desc = descriptionInput.value;

  //save to local storage
  setTasksToLocal();
  resetContainers();
  resetCounter();
  displayAllTasks();
  hideModal();
}

function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.parentElement.nextElementSibling.classList.replace(
      "d-block",
      "d-none"
    );

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.parentElement.nextElementSibling.classList.replace(
      "d-none",
      "d-block"
    );
    return false;
  }
}

const colorArr = [
  "#faef9b",
  "#864AF9",
  "#FFB996",
  "#4CB9E7",
  "#B6C4B6",
  "#C1F2B0",
  "#FF90BC",
  "#765253",
  "#89B9AD",
];

function changBgColor(e, idx) {
  const color = colorArr[Math.trunc(Math.random() * colorArr.length)];
  taskList[idx].bgColor = color;
  taskList[idx].bgColor = setTasksToLocal();
  e.target.closest(".task").style.backgroundColor = color;
}

function changeToBars() {
  gridBtn.classList.remove("active");
  barsBtn.classList.add("active");

  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.remove("col-md-6", "col-lg-4");
    sections[i].style.overflow = "auto";
  }
  for (let j = 0; j < taskContainer.length; j++) {
    taskContainer[j].setAttribute("data-view", "bars");
  }
}

function changeToGrid() {
  gridBtn.classList.add("active");
  barsBtn.classList.remove("active");

  for (let i = 0; i < sections.length; i++) {
    sections[i].classList.add("col-md-6", "col-lg-4");
  }
  for (let j = 0; j < taskContainer.length; j++) {
    taskContainer[j].removeAttribute("data-view");
  }
}
/* 
function changeMode() {
  if (modeBtn.classList.contains("bi-brightness-high-fill")) {
    root.style.setProperty("--main-black", "#fff");
    root.style.setProperty("--sec-black", "beige");
    root.style.setProperty("--text-color", "#030508");
    modeBtn.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
  } else {
    root.style.setProperty("--main-black", "#030508");
    root.style.setProperty("--sec-black", "#00040a");
    root.style.setProperty("--text-color", "#a5a6a7");
    modeBtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
  }
} */

function changeMode() {
  document.body.classList.toggle("darkMode");
  if (document.body.classList.contains("darkMode")) {
    modeBtn.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
  } else {
    modeBtn.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
  }
}

/************** Events **************** */
modal.addEventListener("click", function (e) {
  if (e.target.id === "modal") {
    hideModal();
  }
});

document.addEventListener("keyup", function (e) {
  if (e.code === "Escape") {
    hideModal();
  }
});

newTaskBtn.addEventListener("click", showModal);

addBtn.addEventListener("click", addTask);

searchInput.addEventListener("input", searchTask);

updateBtn.addEventListener("click", editTask);

titleInput.addEventListener("input", function () {
  validate(titleInput, titleRegex);
});

descriptionInput.addEventListener("input", function () {
  validate(descriptionInput, descRegex);
  remainingCounter = 100 - descriptionInput.value.split("").length;
  remainingCounterElement.innerHTML = remainingCounter;
});

barsBtn.addEventListener("click", changeToBars);

gridBtn.addEventListener("click", changeToGrid);

modeBtn.addEventListener("click", changeMode);

document.querySelector(".logOut").addEventListener("click", logOut);

/****** */
function logOut() {
  localStorage.removeItem("loggedUser");
  location.href = "./sign-in.html";
}

