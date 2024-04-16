const addButton = document.querySelector('.add-button');
const beverage = document.querySelector('.beverage');

let beveragesCount = 0;
addNewBeverage();
beverage.remove();

function addNewBeverage() {
    const newBeverage = beverage.cloneNode(true);

    newBeverage.querySelector('.beverage-count').textContent = `Напиток №${++beveragesCount}`;
    makeRadioUnique(newBeverage);
    appendDeleteButton(newBeverage);

    const allBeverages = document.querySelectorAll('.beverage');
    allBeverages[allBeverages.length - 1].after(newBeverage);
}

function makeRadioUnique(beverage) {
    for (const radio of beverage.querySelectorAll('input[type=radio]')) {
        radio.name = `milk${beveragesCount}`;
    }
}
function appendDeleteButton(beverage) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete_button');
    deleteButton.textContent = 'X';
    deleteButton.style.position = 'absolut';
    deleteButton.style.top = '0';
    deleteButton.style.right = '0';
    deleteButton.style.cursor = 'pointer';

    deleteButton.addEventListener('click', () => {
        if (beveragesCount > 1) {
            beverage.remove();
            beveragesCount--;
        }
    });

    beverage.appendChild(deleteButton);
}

addButton.addEventListener('click', addNewBeverage);