// *Delclaring the class that will be used .....

class TODOAPP {
  constructor(task, date) {
    this.task = task;
    this.date = date;
  }
}

class DISPLAY {
  static localStorageApp() {
    const data = Store.getData();
    data.forEach(list => DISPLAY.displayTodoData(list));
  }

  static displayTodoData(todoApp) {
    const show = document.querySelector("tbody");
    const tr = document.createElement("tr");
    tr.className = "table-row";
    tr.innerHTML = `<td> ${todoApp.task}</td>
      <td class="data">${todoApp.date}</td>
      <td class ="edit"><i class="fa fa-edit text-success "><i></td>
      <td class ="delete"> <i class="fa fa-trash-alt text-danger delete"></i></td>`;

    show.appendChild(tr);
  }

  static flashMessage(message, alertColor) {
    const container = document.querySelector(".container");
    const target = document.querySelector(".target");
    const pTag = document.createElement("p");
    pTag.className = `${alertColor} set`;

    pTag.appendChild(document.createTextNode(message));
    container.insertBefore(pTag, target);
    setTimeout(() => {
      document.querySelector("p").remove();
    }, 2000);
  }

  static clearInputFields() {
    document.querySelector("#task").value = "";
    document.querySelector("#date").value = "";
  }

  static deleteTask(target) {
    if (target.classList.contains("delete")) {
      document.querySelector(".table-row").remove();

      const data = Store.getData();
      data.forEach(index => {
        data.splice(index, 1);
      });
      localStorage.setItem("todo", JSON.stringify(data));

      DISPLAY.flashMessage("Task Deleted", "bg-success ");
    } else if (target.classList.contains("check")) {
      DISPLAY.flashMessage("Task checked", "bg-success");
      let line = document.querySelector(".line");
      line.style.textDecoration = "line-through";
    }
  }
}

document.querySelector("tbody").addEventListener("click", e => {
  if (e.target.classList.contains("edit")) {
    const taskField = document.querySelector("#task");
    const dateField = document.querySelector("#date");

    const data = Store.getData();
    data.forEach(item => {
      let result = item.task;
      let date = item.date;
      taskField.value = result;
      dateField.value = date;
    });
  }
});

//* storing data to local storage..
class Store {
  static addTodoList(todoApp) {
    const data = Store.getData();
    data.push(todoApp);
    localStorage.setItem("todo", JSON.stringify(data));
  }

  static getData() {
    let data;
    if (localStorage.getItem("todo") === null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem("todo"));
    }
    return data;
  }
}

// *functions for the Event actions .....

const updateTask = e => {
  //* Get the target Elements .....
  const taskField = document.querySelector("#task").value;
  const dateField = document.querySelector("#date").value;

  e.preventDefault();
  if (taskField === "" || dateField === "") {
    DISPLAY.flashMessage("Enter all fields", "bg-danger ");
    DISPLAY.clearInputFields();
    console.log("faild");
  } else {
    const todoApp = new TODOAPP(taskField, dateField);
    DISPLAY.displayTodoData(todoApp);
    DISPLAY.flashMessage("task Added", "bg-success ");
    DISPLAY.clearInputFields();
    Store.addTodoList(todoApp);
    console.log(todoApp.task);
  }
};

const removeTask = e => {
  DISPLAY.deleteTask(e.target);
};

//* Events for submit action.....
document.addEventListener("DOMContentLoaded", DISPLAY.localStorageApp);

document.querySelector("#form").addEventListener("submit", updateTask);

// *Events for Delete button.....
document.querySelector(".show").addEventListener("click", removeTask);
