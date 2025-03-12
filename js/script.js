// Define UI elements

let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let taskList = document.querySelector('#task');
let filter = document.querySelector('#filter_task');
let clearBtn = document.querySelector('#btn');

// Define EventListner

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', taskFilter);
document.addEventListener('DOMContentLoaded', getTask);


// Define functions
// Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Please Add a Task!');
    } else{
        // create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        // adding remove btn part
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link)
        // end part
        taskList.appendChild(li);
        // to store in localStorage
        storeInLocalStorage(taskInput.value);
        e.preventDefault();
        taskInput.value = '';
    }
}

// remove task

function removeTask(e) {
    if(e.target.hasAttribute("href")){
        if(confirm("Are you sure?")){
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }
    }
}

// creal all task

function clearTask(e) {
    taskList.innerHTML = "";

    // faster way
    // while(taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild);
    // }
    localStorage.clear();
}


// filter task

function taskFilter(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });

}


// store in local storage

function storeInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get data from localStorage

function getTask() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        // adding remove btn part
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link)
        // end part
        taskList.appendChild(li);
    })
}

function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
