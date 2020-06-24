'use strict';

const budget = prompt('¿Cuál es tu presupuesto mensual?');
const available = document.querySelector('#restante');
const addQnt= document.querySelector('#agregar-gasto');
let budgetQnt;

class Budget {
  constructor(budget){
    this.budget = parseInt(budget);
    this.available = parseInt(budget);
  }
  remainingBgt(qnt = 0) {
    return this.available -= parseInt(qnt);
  }
}

class Interface {
  insertBudget(qnt) {
    const spanBudget = document.querySelector('span#total');
    const spanAvailable = document.querySelector('span#restante');

    spanBudget.innerText = `${qnt}`;
    spanAvailable.innerText = `${qnt}`;
  }
  printMessage(message, type){
    const msgContainer = document.createElement('div');
    msgContainer.classList.add('text-center', 'alert');
    if(type === 'error'){
      msgContainer.classList.add('alert-danger')
    } else{
      msgContainer.classList.add('alert-success')
    }
    msgContainer.appendChild(document.createTextNode(message));
    document.querySelector('.primario').insertBefore(msgContainer, addQnt);
    setTimeout(function() {
      document.querySelector('.primario .alert').remove();
      addQnt.reset();
    }, 3000)     
}
  addListOfSpendings(type, qnt){
    const spendingsList = document.querySelector('#gastos ul');
    const list = document.createElement('li');
    list.className = 'list-group-item d-flex justify-content-between align-items-center';
    list.innerHTML = `${type}
                      <span class="badge badge-primary badge-pill">${qnt} €</span>`;
    spendingsList.appendChild(list);
}
  remainingBudget(qnt) {
    const availableQnt = budgetQnt.remainingBgt(qnt);
    available.innerText = `${availableQnt}`;
    this.checkBudget();
  }

  checkBudget() {
    const totalBgt = budgetQnt.budget;
    const totalAvailable = budgetQnt.available;
    const divAvailable = document.querySelector('.restante');

    if((totalBgt / 4) > totalAvailable){
      divAvailable.classList.remove('alert-success', 'alert-warning');
      divAvailable.classList.add('alert-danger');
    } else if((totalBgt / 2) > totalAvailable){
      divAvailable.classList.remove('alert-success');
      divAvailable.classList.add('alert-warning');
    }
  }
}

function checkBudget(){
  if(budget === null || budget === ''){
    window.location.reload();
  } else {
    budgetQnt = new Budget(budget);
    const ui = new Interface();
    ui.insertBudget(budgetQnt.budget);
  }
}

function addSpending(evt){
  evt.preventDefault();
  const spendingType = document.querySelector('#gasto').value;
  const spendingQnt =  document.querySelector('#cantidad').value;
  const ui = new Interface();
  if(spendingType === '' || spendingQnt === ''){
    ui.printMessage('Ha habido un error', 'error');
  } else {
    ui.printMessage('Correcto', 'correcto');
    ui.addListOfSpendings(spendingType, spendingQnt);
    ui.remainingBudget(spendingQnt);
  }
}

window.addEventListener('load', checkBudget);
addQnt.addEventListener('submit', addSpending);