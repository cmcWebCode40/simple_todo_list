// Delclaring the c {lass that will be used .....

class TODOAPP {
    constructor(task, date, time) {
        this.task = task;
        this.date = date;
        this.time = time;
    }
}

class DISPLAY  {
    static localStorageApp() {
        const data = Store.getData();
        data.forEach(list => DISPLAY.displayTodoData(list));
    }

    static displayTodoData(todoApp) {
        const show = document.querySelector('.show');
        const div = document.createElement('div');
        div.className = 'block flex';
        div.innerHTML = `<p><input type="checkbox"class="check"> ${todoApp.task}</p>
      <p>${todoApp.date}</p>
      <p>${todoApp.time}</p>
      <p class ="delete"><i class="fa fa-trash-alt text-danger delete"></p>`;
        show.appendChild(div);
    }

    static flashMessage(message, alertColor) {
        const container = document.querySelector('.container');
        const target = document.querySelector('.target');
        const pTag = document.createElement('p');
        pTag.className = `${alertColor} set`;

        pTag.appendChild(document.createTextNode(message));
        container.insertBefore(pTag, target);
        setTimeout(() => {
            document.querySelector('p').remove();
        }, 2000);
    }


 

    static clearInputFields() {
        document.querySelector('#task').value = "";
        document.querySelector('#date').value = "";
        document.querySelector('#time').value = "";
    }

    static deleteTask(target) {
        if (target.classList.contains("delete")) {
            document.querySelector('.block').remove();
             
            const data = Store.getData();
            data.forEach((list, index) => {
             data.splice(index, 1);
            });
         localStorage.setItem('todo', JSON.stringify(data))
             
            DISPLAY.flashMessage("Task Deleted", "bg-success ");
        } else   if (target.classList.contains("check")) {
            DISPLAY.flashMessage("Task checked", "bg-success")
          }
      }
  }


// local Storage....

class Store {
    static addTodoList(todoApp) {
        const data = Store.getData();
        data.push(todoApp)
        localStorage.setItem('todo', JSON.stringify(data));
    }

    static getData() {
        let data;
        if (localStorage.getItem('todo') === null) {
            data = [];
        } else {
            data = JSON.parse(localStorage.getItem('todo'));
        }
        return data;
    }
}

// functions for the Event actions .....

const updateTask = (e) => {

    // Get the target Elements .....
    const taskField = document.querySelector('#task').value;
    const dateField = document.querySelector('#date').value;
    const timeField = document.querySelector('#time').value;

    e.preventDefault()
    if (taskField === "" || dateField === "" || timeField === "") {
        DISPLAY.flashMessage("Enter all fields", "bg-danger ");
        DISPLAY.clearInputFields()
        console.log("faild");
    } else {
        const todoApp = new TODOAPP(taskField, dateField, timeField);
        DISPLAY.displayTodoData(todoApp);
        DISPLAY.flashMessage("task Added", "bg-success ");
        DISPLAY.clearInputFields()
        Store.addTodoList(todoApp);
        console.log(todoApp.task);
    }
}


const removeTask = (e) => {
    DISPLAY.deleteTask(e.target);
}

// Events for submit action.....
document.addEventListener('DOMContentLoaded', DISPLAY.localStorageApp);

document.querySelector('#form').addEventListener('submit', updateTask);

// Events for Delete button.....
document.querySelector(".show").addEventListener('click', removeTask);



