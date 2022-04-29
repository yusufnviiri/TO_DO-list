/* eslint-disable import/extensions */
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const listContent = document.querySelector('.list-content');

const addlistItem = (item) => {
  listContent.innerHTML += `
    <div class="todoItem">
    <div class="todoCheckbox">
      <input type="checkbox" class="todoCheckboxInput"  />
      <p class="todoActivity" > ${item.description}  </p>
    </div>
    <button class="addbtn">
      <i class="fa fa-ellipsis-v" aria-hidden="true" ></i>
    </button>
    <button class="deleteItem"> <i class="fa fa-trash" aria-hidden="true"></i></button>  
    </div>
  
   
      `;
};

const displayItems = () => {
  const todoList = [
    {
      description: 'Learn React',
      completed: false,
      index: 1,
    },
    {
      description: 'complete the todo list',
      completed: false,
      index: 2,
    },
    {
      description: 'Email Student success',
      completed: false,
      index: 3,
    },

  ];
  const listItems = todoList;
  listItems.forEach((item) => { addlistItem(item); });
};
// displayItems
document.addEventListener('DOMContentLoaded', displayItems);