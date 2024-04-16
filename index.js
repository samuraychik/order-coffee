const addButton = document.querySelector('.add-button');
const beverage = document.querySelector('.beverage');

let formsCount = 0;

addNewBeverage();
beverage.remove();
addButton.addEventListener('click', addNewBeverage);

function addNewBeverage() {
    const newBeverage = beverage.cloneNode(true);

    newBeverage.querySelector('.beverage-count').textContent = `Напиток №${++formsCount}`;
    makeRadioUnique(newBeverage);
    appendDeleteButton(newBeverage);

    const allBeverages = document.querySelectorAll('.beverage');
    allBeverages[allBeverages.length - 1].after(newBeverage);
}

function makeRadioUnique(beverage) {
    for (const radio of beverage.querySelectorAll('input[type=radio]')) {
        radio.name = `milk${formsCount}`;
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
        if (beveragesCount() > 1) {
            beverage.remove();
        }
    });

    beverage.appendChild(deleteButton);
}

function beveragesCount() {
    return document.querySelectorAll('.beverage').length;
}

const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', event => {
    event.preventDefault();
    const modal = document.createElement('div');
    modal.classList.add('modal-window');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.textContent = getDrinksPhrase();

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = '×';

    closeButton.addEventListener('click', function () {
        modal.remove();
    });

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
});


function getDrinksPhrase() {
    const number = beveragesCount();
    let base = `Вы заказали ${number} `;
    if (number % 10 === 1 && number % 100 !== 11) {
        base += 'напиток';
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        base += 'напитка';
    } else {
        base += 'напитков';
    }
    return base;
}
