const todoList=document.getElementById('todo-list');
const todoInput=document.getElementById('todo-input');
const addBtn=document.getElementById('add-btn');

const todos=JSON.parse(localStorage.getItem('todos')) || [];

function addTodo(){
    const todoText=todoInput.value.trim();
    if(todoText) {
        todos.push(todoText);
        localStorage.setItem('todos',JSON.stringify(todos));
        todoInput.value='';
        renderTodos();
    }
}

function renderTodos(){
    todoList.innerHTML="";
    todos.forEach((todo,index)=>{
        const todoElement=document.createElement('li');
        todoElement.innerHTML=`
        <span>${todo}</span>
        <div>
        <button class="edit" onclick="editTodo(${index})">Edit</button>
        <button class="delete" onclick="deleteTodo(${index})">Delete</button>
        </div>
        `
        todoList.appendChild(todoElement);
    })
}

addBtn.addEventListener('click',(e)=>{
    if(addBtn.textContent === "Add"){
        addTodo();
    }
})

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(index){
    todos.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todos));
    renderTodos();
}

function editTodo(index){
    todoInput.value=todos[index];
    addBtn.textContent="Update";
    addBtn.onclick= () => updateTodo(index);
}

function updateTodo(index){
      const todoTextUpdate=todoInput.value.trim();
      if(todoTextUpdate){
        todos[index]=todoTextUpdate;
         saveTodos();
         renderTodos();
         todoInput.value='';
         resetAddButton();
      }
}

function resetAddButton() {
    addBtn.textContent = "Add";
    addBtn.onclick = addTodo;
}

renderTodos();