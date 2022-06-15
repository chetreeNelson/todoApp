const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn=document.querySelector(".footer button");
inputBox.onkeyup = () => {
  let userData = inputBox.value; //user enter value
  if (userData.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    //if localstorage is null
    listArr = []; //create blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //transfering json string  into js object
  }
  listArr.push(userData); //adding usder data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //js obj to json string
  showTasks();
  addBtn.classList.remove("active");
};


//adding tasks in list and show
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    //if localstorage is null
    listArr = []; //create blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //transfering json string  into js object
  }
  const pendingNumb =document.querySelector(".pendingNumb");
  pendingNumb.textContent=listArr.length;
  if(listArr.length>0){
    deleteAllBtn.classList.add("active");
  }
    else{
      deleteAllBtn.classList.remove("active")

    }
  
  let newLiTag = "";
    listArr.forEach((element, index) => {
      newLiTag += `<li>${element} <span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
  
}

//delete tasks
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //to delete particular indeexed li
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

deleteAllBtn.onclick =()=>{
  listArr=[]; // empty array
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}
