const addButton = document.querySelector('.add-button');
const beverage = document.querySelector('.beverage');
let beveragesCount = 1;

function addNewBeverage() {
    const newBeverage = beverage.cloneNode(true);
    const allBeverages = document.querySelectorAll('.beverage');
    const lastBeverage = allBeverages[allBeverages.length - 1];
    newBeverage.querySelector('.beverage-count').textContent = `Напиток №${++beveragesCount}`;
    lastBeverage.insertAdjacentElement('afterend', newBeverage);
}

addButton.addEventListener('click', addNewBeverage);