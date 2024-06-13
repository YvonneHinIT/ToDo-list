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

        //label with task 
        const label = document.createElement("label");
        label.innerHTML = task.taskToDo;
        label.setAttribute("for", index);
        const parentDiv = divMake;
        parentDiv.appendChild(label);
        
        //radio button
        const radioMake = document.createElement("input");
        radioMake.type = "radio";
        radioMake.name = "task";
        radioMake.value = index;
        radioMake.id = index;
        const parentLabel = label;
        parentLabel.appendChild(radioMake); 
        
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
        label.innerHTML = task.taskToDo;
        label.setAttribute("for", index);
        const parentDiv = divMake;
        parentDiv.appendChild(label);

        //radio button
        const radioMake = document.createElement("input");
        radioMake.type = "radio";
        radioMake.name = "done";
        radioMake.value = index;
        radioMake.id = index;
        parentDiv.appendChild(radioMake);
      
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
    const selectedRadio = document.querySelector('input[name="task"]:checked');
    const selectedTask= selectedRadio.parentElement.textContent;
    console.log(selectedTask);

    for (let i in tasks) {
        if (toDo[i].taskToDo == selectedTask) {
            toDo[i].taskComplete = true;
            toDo[i].finishedDate = new Date ().toLocaleString();
            completedToDo.push(toDo[i]);
            toDo.splice([i],1);
            break
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
    const selectedRadio = document.querySelector('input[type="radio"]:checked');
    const selectedTask= selectedRadio.parentElement.textContent;
    console.log(selectedTask);

    for (let i in completedToDo) {
        if (completedToDo[i].taskToDo == selectedTask) {
            completedToDo.splice([i],1);
            break;
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
    const selectedRadio = document.querySelector('input[name="task"]:checked');
    const selectedTask= selectedRadio.parentElement.textContent;
    console.log(selectedTask);

    for (let i in toDo) {
        if (toDo[i].taskToDo == selectedTask && toDo[i] !== toDo[0]) {
            const storedTask = toDo[i];
            toDo[i] = toDo[i-1];
            toDo[i-1] = storedTask;
            break;
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
    const selectedRadio = document.querySelector('input[name="task"]:checked');
    const selectedTask= selectedRadio.parentElement.textContent;
    console.log(selectedTask);

    for (let i in toDo) {   
        if (toDo[i].taskToDo == selectedTask &&  toDo[i] !== toDo[toDo.length-1]) {
            const count = Number(i)+1;
            const storedTask = toDo[i];
            console.log(count);
            console.log(storedTask);
            toDo[i] = toDo[count];
            toDo[count] = storedTask;
            break;
        }
    };

    fillTasks();
    console.log("move down");
    console.log(toDo);
}
console.log("first log");
console.log(toDo);


