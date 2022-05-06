/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */

import './style.css';

class List {
  constructor(description, index, completed) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }
}

// Create local storage

if (localStorage.getItem('mylist') === null) {
  localStorage.setItem('mylist', JSON.stringify([]));
}
const taskLs = JSON.parse(localStorage.getItem('mylist'));

// updateLocalStorage

function updateLocalStorage() {
  localStorage.setItem('mylist', JSON.stringify(taskLs));
  const another = JSON.parse(localStorage.getItem('mylist'));
  return another;
}

// display todoList
const displayItem = (items) => {
  let todoos = '';

  for (let i = 0; i < items.length; i += 1) {
    const ischecked = items.completed == 'completed' ? 'checked' : '';

    todoos += `
  <div class="todoItem">
  <div class="todoCheckbox">
    <input type="checkbox" class="checkBox" ${ischecked} />
    <p class="todoActivity" > ${items[i].description}  </p>
  </div>
  <div class="${items[i].index}">
  <button class="addbtn">

  <span class="edit" id='${items[i].index}'><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
  </span>
  <span class="delete" id='${items[i].index}'>&cross;</span>
  </button>
  </div>
  <button class="deleteItem">  </button>  
  </div>   `;
  }
  return todoos;
};

// clear fields

const clearFields = () => {
  document.querySelector('.taskInput').value = '';
};

// showlist
const showList = () => {
  const listContent = document.querySelector('.list-content');
  listContent.innerHTML = `

 ${displayItem(taskLs)}`;

  clearFields();
};

// Create new task
const addItem = (description) => {
  const anothertask = new List(description, taskLs.length + 1, false);
  taskLs.push(anothertask);
  updateLocalStorage();
  showList();
};
// to edit

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.querySelector('.taskInput').value;
  addItem(task);
});

const deleted = (pop) => {
  const removeLss = JSON.parse(localStorage.getItem('mylist'));
  removeLss.forEach((element, index) => {
    if (element.index == pop) {
      removeLss.splice(index, 1);
      localStorage.setItem('mylist', JSON.stringify(removeLss));

      console.log(' ');
    }
  });
  localStorage.setItem('mylist', JSON.stringify(removeLss));
  location.reload();
};
// delete function

const deleteItem = (ele) => {
  if (ele.classList.contains('delete')) {
    ele.parentElement.parentElement.parentElement.remove();
    // removeItem();}
    const pop = ele.parentElement.parentElement.classList.value;

    deleted(pop);
  }
};

// delete item
const toDelete = document.querySelector('.list-content');
if (!toDelete) {
  console.log(' ');
} else {
  document.querySelector('.list-content').addEventListener('click', (e) => {
    if (!e) {
      console.log(' ');
    } else {
      deleteItem(e.target);
    }
  });
}

// event to delete from ls

// editing
const edits = (description, index, completed) => {
  const anothertask = new List(description, index, completed);
  taskLs.push(anothertask);
  updateLocalStorage();
  showList();
  console.log(`edited${index}`);
};

// edit item

const toEdit = document.querySelector('.list-content');
const editForm = document.querySelector('.edit-form');
const form2 = document.querySelector('.form');
const editItem = (tar) => {
  if (tar.parentElement.classList.contains('edit')) {
    form2.style.display = 'none';
    editForm.style.display = 'block';
    const editInput = document.querySelector('.editInput');
    editInput.focus();
    const itemId = tar.parentElement.parentElement.parentElement.classList.value;
    const editItem = JSON.parse(localStorage.getItem('mylist'));

    for (let i = 0; i < editItem.length; i += 1) {
      if (!editItem[i]) {
        console.log(' ');
      } else if (editItem[i].index == itemId) {
        editInput.value = editItem[i].description;
        editForm.addEventListener('submit', (e) => {
          e.preventDefault();
          editItem[i].description = editInput.value;
          editItem[i].completed = false;
          editItem[i].index = itemId;
          edits(
            editItem[i].description,
            editItem[i].index,
            editItem[i].completed,
          );
          deleted(editItem[i].index); // delete item from ls
          location.reload();
        });
      }
    }
  }
};

// edit function

if (!toEdit) {
  console.log(' ');
} else {
  toEdit.addEventListener('click', (e) => {
    editItem(e.target);
  });
}

const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', () => {
  location.reload();
});

const init = () => {
  window.onload = () => {
    showList();
  };
};
init();
