const addButton = document.querySelector('.add-button');
const beverage = document.querySelector('.beverage');

let formsCount = 0;

const milkTypes = new Map([
    ["usual", "Обычное"],
    ["no-fat", "Обезжиренное"],
    ["soy", "Соевое"],
    ["coconut", "Кокосовое"],
]);

const optionsTypes = new Map([
    ["whipped cream", "Взбитые сливки"],
    ["marshmallow", "Зефирки"],
    ["chocolate", "Шоколад"],
    ["cinnamon", "Корица"],
]);

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

    for (const checkbox of beverage.querySelectorAll('input[type=checkbox]')) {
        checkbox.name = `options${formsCount}`;
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

    const table = getOrderTable();

    modalContent.appendChild(closeButton);
    modalContent.appendChild(table);
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


function getOrderTable() {
    const beverageFields = document.querySelectorAll('.beverage');

    const table = document.createElement('table');
    table.innerHTML = `
    <thead>
      <tr>
        <th>Напиток</th>
        <th>Молоко</th>
        <th>Дополнительно</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

    const tableBody = table.querySelector('tbody');

    beverageFields.forEach((fieldset) => {
        const beverageSelect = fieldset.querySelector('select');
        const beverage = beverageSelect.options[beverageSelect.selectedIndex].text;

        const number = fieldset.querySelector('.beverage-count').textContent.split("№")[1];
        const milkRadio = fieldset.querySelector(`input[name='milk${number}']:checked`);
        const milk = milkRadio ? milkTypes.get(milkRadio.value) : '';

        const optionsCheckboxes = fieldset.querySelectorAll(`input[name="options${number}"]:checked`);
        const options = Array.from(optionsCheckboxes)
            .map(checkbox => optionsTypes.get(checkbox.value))
            .join(', ');

        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${beverage}</td>
      <td>${milk}</td>
      <td>${options}</td>
    `;

        tableBody.appendChild(row);
    });
    return table;
}
