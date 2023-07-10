import {
  clearModalInputs,
  taskUpdate,
  summaryUpdate,
  inputValidation,
  // daysRemaining,
} from "./ts/functions";
import { creatingTask } from "./ts/task";
import {
  taskSubmit,
  modalBg,
  modalTitle,
  validateModal,
  // taskName,
  // taskImportance,
  // taskDescription,
  // taskDeadline,
  // taskCategories,
} from "./ts/variables";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDjIYSECgWl3N4T_B6YTgV_HrRhx-vQaQs",
//   authDomain: "to-do-list-c0916.firebaseapp.com",
//   projectId: "to-do-list-c0916",
//   storageBucket: "to-do-list-c0916.appspot.com",
//   messagingSenderId: "877853950236",
//   appId: "1:877853950236:web:14674812d58b2056d77ad9",
// };

// // init firebase app
// initializeApp(firebaseConfig);

// // init services
// const db = getFirestore();

// // collection ref
// const colRef = collection(db, "tasks");

// // get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let tasks: any[] = [];
//     snapshot.docs.forEach((doc) => {
//       tasks.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(tasks);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// const CurDate = function (): string {
//   const currentDate = new Date();
//   const currentDay = String(currentDate.getDate()).padStart(2, "0");
//   const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
//   const currentYear = String(currentDate.getFullYear());

//   const formattedDate = `${currentDay}.${currentMonth}.${currentYear}`;
//   return formattedDate;
// };

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();

  if (modalTitle && modalTitle.textContent === "NEW TASK") {
    if (inputValidation()) {
      creatingTask();
      summaryUpdate();

      clearModalInputs();

      if (modalBg?.classList.contains("active")) {
        (modalBg as HTMLElement).classList.remove("active");
      }
    } else {
      validateModal.classList.add("active");
    }
  } else {
    if (inputValidation()) {
      taskUpdate();
      clearModalInputs();

      if (modalBg?.classList.contains("active")) {
        modalBg.classList.remove("active");
      }
    } else {
      validateModal.classList.add("active");
    }
  }
});
