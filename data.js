"use strict";
window.onload = init

import {Task} from "./task.js";

function init () {
    const huidigJaar = document.getElementById("currentYear");
    const huidigDatum = document.getElementById("currentDate");
    const storeDatum = new Date();
    huidigJaar.innerHTML = storeDatum.getFullYear();
    huidigDatum.innerHTML = storeDatum.getDate() + "/" + (storeDatum.getMonth()+1);
    console.log(storeDatum);
    fillTasks ();  
};

// Create an Array of Task objects
let tasks = [
    new Task("Vaatwasser uitruimen"),
    new Task("Invoeren absentielijst"),
    new Task("5 min Werkoverleg"),
    new Task("Mail lezen", true, "01-04-2022, 09:00:00"),
    new Task("Takenlijst invoeren"),
    new Task("Werkdag nabespreking")
];

// filter all tasks where task.Complete == false ( = not completed )
let toDo = tasks.filter( (task) => {return !task.taskComplete});

// filter all tasks where task.Complete == true ( = completed )
let completedToDo = tasks.filter( (task) => { return task.taskComplete });


//Takenlijst invullen
function fillTasks () {
    const taskSection = document.getElementById("contentElem");
    taskSection.innerHTML = "";
    const completedSection = document.getElementById("contentCompletedElem");
    completedSection.innerHTML = "";

    let backgroundWhite = true;

    toDo.map((task, index) => {
        //div element
        const divMake = document.createElement("div");
        const parentSection = document.getElementById("contentElem");
        backgroundWhite ? (divMake.className = "taskItem" , backgroundWhite = false) 
                        : (divMake.className = "taskItem colored" , backgroundWhite = true);
        parentSection.appendChild(divMake);

        //label 
        const label = document.createElement("label");
        label.setAttribute("for", index);
        const parentDiv = divMake;
        parentDiv.appendChild(label);
        
        //radio button
        const checkboxMake = document.createElement("input");
        checkboxMake.type = "checkbox";
        checkboxMake.name = "task";
        checkboxMake.value = index;
        checkboxMake.id = index;
        const parentLabel = label;
        parentLabel.appendChild(checkboxMake); 

        label.innerHTML += task.taskToDo;
        
        
    });

    completedToDo.map((task, index) => {
        // div element
        const divMake = document.createElement("div");
        const parentSection = document.getElementById("contentCompletedElem");
        backgroundWhite ? (divMake.className = "taskItem" , backgroundWhite = false) 
                        : (divMake.className = "taskItem colored" , backgroundWhite = true);
        parentSection.appendChild(divMake);

        //label with task
        const label = document.createElement("label");
        label.setAttribute("for", index);
        const parentDiv = divMake;
        parentDiv.appendChild(label);

        //radio button
        const checkboxMake = document.createElement("input");
        checkboxMake.type = "checkbox";
        checkboxMake.name = "done";
        checkboxMake.value = index;
        checkboxMake.id = index;
        const parentLabel = label;
        parentLabel.appendChild(checkboxMake);

        label.innerHTML += task.taskToDo;
      
        return task, index;
    });
};


//Nieuwe taak toevoegen
const buttonAddTask = document.getElementById("addTask");
buttonAddTask.addEventListener('click', addTask);

function addTask () {
    const readNewTask = document.getElementById("taskName").value;
    console.log(readNewTask);

    let checkTask = toDo.some(toDo => toDo.taskToDo == readNewTask)

    readNewTask == "" ? alert("Vul een taak in") : checkTask 
                ? alert("Taak bestaat al") : toDo.push(new Task (readNewTask));
    
    fillTasks();
    console.log("add task");
    console.log(toDo);
};


//Taak afvinken
const buttonMarkComplete = document.getElementById("MarkComplete");
buttonMarkComplete.addEventListener('click', markCompleted);

function markCompleted () {
    const allSelectedCheckbox = document.querySelectorAll('input[name="task"]:checked');

    let selectedStore = [];
    
    for(let j = 0; j < allSelectedCheckbox.length;  j++)
    {
        const selectedTask= allSelectedCheckbox[j].parentElement.textContent;
        selectedStore.push(selectedTask);
    }

    console.log(selectedStore);

    for (let j in selectedStore) {
        for (let i in toDo) {
            if (toDo[i].taskToDo == selectedStore[j]) {
                toDo[i].taskComplete = true;
                toDo[i].finishedDate = new Date ().toLocaleString();
                completedToDo.push(toDo[i]);
                toDo.splice([i],1);
                break
            }
        }
    };
    
    fillTasks();
    console.log("mark complete");
    console.log(completedToDo);
};


//Taak verwijderen
const buttonRemoveTask = document.getElementById("deleteTask");
buttonRemoveTask.addEventListener('click', removeTask);

function removeTask () {
    const allSelectedCheckbox = document.querySelectorAll('input[name="done"]:checked');

    let selectedStore = [];
    
    for(let j = 0; j < allSelectedCheckbox.length;  j++)
    {
        const selectedTask= allSelectedCheckbox[j].parentElement.textContent;
        selectedStore.push(selectedTask);
    }

    console.log(selectedStore);

    for (let j in selectedStore) {
        for (let i in completedToDo) {
            if (completedToDo[i].taskToDo == selectedStore[j]) {
                completedToDo.splice([i],1);
                break;
            }
        }
    };

    fillTasks();
    console.log("deleted");
    console.log(completedToDo);

};

//Taak omhoog verplaatsen
const buttonMoveUp = document.getElementById("moveUp");
buttonMoveUp.addEventListener('click', moveTaskUp);

function moveTaskUp ()  {
    const allSelectedCheckbox = document.querySelectorAll('input[name="task"]:checked');
    console.log(allSelectedCheckbox)
    console.log(toDo)
    let selectedStore = [];
    
    for(let j = 0; j < allSelectedCheckbox.length;  j++)
    {
        const selectedTask= allSelectedCheckbox[j].parentElement.textContent;
        selectedStore.push(selectedTask);
    }

    console.log(selectedStore);

    for (let j in selectedStore) {
        for (let i in toDo) {
            const first = Number(i)-selectedStore.length
            if (toDo[i].taskToDo == selectedStore[j] && toDo[first] >= toDo[0]) {
                const storedTask = toDo[i];
                toDo[i] = toDo[i-1];
                toDo[i-1] = storedTask;
                break;
            }
        }
    };

    fillTasks();
    console.log("move up")
    console.log(toDo);
}

//Taak omlaag verplaatsen
const buttonMoveDown = document.getElementById("moveDown");
buttonMoveDown.addEventListener('click', moveTaskDown);

function moveTaskDown ()  {
    const allSelectedCheckbox = document.querySelectorAll('input[name="task"]:checked');
    console.log(allSelectedCheckbox)
    let selectedStore = [];
    
    for(let j = 0; j < allSelectedCheckbox.length;  j++)
    {
        const selectedTask= allSelectedCheckbox[j].parentElement.textContent;
        selectedStore.push(selectedTask);
    }

    console.log(selectedStore);


    for (let j in selectedStore) {
        for (let i in toDo) { 
            const last = Number(i)+selectedStore.length
            if (toDo[i].taskToDo == selectedStore[j] &&  toDo[last] <= toDo[toDo.length-1]) {
                const count = Number(i)+Number(j)+1;
                const storedTask = toDo[i];
                console.log(storedTask);
                toDo[i] = toDo[count];
                toDo[count] = storedTask;
                console.log(toDo)
                break;
            }
        }
    };

    fillTasks();
    console.log("move down");
    console.log(toDo);
}
console.log("first log");
console.log(toDo);


