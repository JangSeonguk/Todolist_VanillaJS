const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const usernameForm = document.querySelector("#username-form");
const usernameInput = document.querySelector("#username-input");
const greeting = document.querySelector("#greeting");
const refreshButton = document.querySelector("#refresh-btn")

let currentUser = null;
const TODOS_KEY = "todos";

let toDos = [];


function saveToDos() {
    localStorage.setItem(currentUser, JSON.stringify(toDos));
}

function loadToDos(username) {
    const savedToDos = localStorage.getItem(username);
    if (savedToDos) {
        toDos = JSON.parse(savedToDos);
        toDos.forEach(paintToDo);
    } else {
        toDos = [];
    }
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

function usercheck(event){
    event.preventDefault();
    const username = usernameInput.value;
    if (username) {
        currentUser = username;
        greeting.innerText = `Hello, ${username}!`;
        usernameForm.style.display = "none";
        toDoForm.style.display = "block";
        toDoList.innerHTML = "";
        loadToDos(currentUser); 
        refreshButton.style.display = "inline-block"
        refreshButton.style.marginLeft = "10px"; 
        refreshButton.addEventListener("click", () => {
            location.reload();
        });

        greeting.appendChild(refreshButton);
    }
}

toDoForm.addEventListener("submit", handleToDoSubmit);
usernameForm.addEventListener("submit", usercheck) 

