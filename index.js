const addButton = document.querySelector('.add-button');
const beverage = document.querySelector('.beverage');
let beveragesCount = 1;

function addNewBeverage() {
    const newBeverage = beverage.cloneNode(true);
    const allBeverages = document.querySelectorAll('.beverage');
    const lastBeverage = allBeverages[allBeverages.length - 1];
    newBeverage.querySelector('.beverage-count').textContent = `Напиток №${++beveragesCount}`;
    lastBeverage.insertAdjacentElement('afterend', newBeverage);

    for (const radio of newBeverage.querySelectorAll("input[type=radio]")) {
        radio.name = "milk" + beveragesCount;
    }
    updateDeleteButtons();
}

function updateDeleteButtons() {
    let allBeverages = document.querySelectorAll('.beverage');

    allBeverages.forEach(beverage => {
        if (allBeverages.length > 1) {
            if (beverage.querySelectorAll('.delete_button').length === 0) {
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete_button');
                deleteButton.textContent = 'X';
                deleteButton.style.position = 'absolut';
                deleteButton.style.top = '0';
                deleteButton.style.right = '0';
                deleteButton.style.cursor = 'pointer';

                deleteButton.addEventListener('click', () => {
                    beverage.remove();
                    allBeverages = document.querySelectorAll('.beverage');
                    if (allBeverages.length === 1) {
                        allBeverages[0].querySelector('.delete_button').remove();
                    }
                });

                beverage.appendChild(deleteButton);
            }
        }

    });
}

addButton.addEventListener('click', addNewBeverage);


const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', event => {
    event.preventDefault();
    const modal = document.createElement('div');
    modal.classList.add('modal-window');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.textContent = 'Заказ принят!';

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.textContent = '×';

    closeButton.addEventListener('click', function() {
        modal.remove();
    });

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
});