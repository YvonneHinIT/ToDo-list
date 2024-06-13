"use strict";

class Task {
    constructor (title,completed = false,completeDate = null) {
        this.taskToDo = title;
        this.taskComplete = completed;
        this.finishedDate = completeDate;
    }
};



export {Task};