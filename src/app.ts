import { creatingTask } from "./ts/task.js";
import { taskSubmit } from "./ts/variables.js";

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();
  creatingTask();
});

/*
IMPORTANT
1. Why can i change this (input as HTMLInputElement).value in modal.ts as i did with 
    const inputType: string = (input as HTMLInputElement).type;
*/
