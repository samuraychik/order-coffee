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
    makeFormEntriesUnique(newBeverage, formsCount);
    appendWishesArea(newBeverage);
    appendDeleteButton(newBeverage);

    const allBeverages = document.querySelectorAll('.beverage');
    allBeverages[allBeverages.length - 1].after(newBeverage);
}

function makeFormEntriesUnique(beverage, number) {
    for (const radio of beverage.querySelectorAll('input[type=radio]')) {
        radio.name = `milk${number}`;
    }

    for (const checkbox of beverage.querySelectorAll('input[type=checkbox]')) {
        checkbox.name = `options${number}`;
    }
}

function changeAllFormsIndexing() {
    const beverageFields = document.querySelectorAll('.beverage');
    let counter = 1;
    beverageFields.forEach((fieldset) => {
        fieldset.querySelector('.beverage-count').textContent = `Напиток №${counter}`;
        makeFormEntriesUnique(fieldset, counter);
        counter++;
    });
}

function appendDeleteButton(beverage) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X';
    deleteButton.style.position = 'absolut';
    deleteButton.style.top = '0';
    deleteButton.style.right = '0';
    deleteButton.style.cursor = 'pointer';

    deleteButton.addEventListener('click', () => {
        if (beveragesCount() > 1) {
            beverage.remove();
            formsCount--;
            changeAllFormsIndexing();
        }
    });

    beverage.appendChild(deleteButton);
}

function appendWishesArea(beverage) {
    const label = document.createElement('label');
    label.classList.add('wishes-label');
    label.setAttribute('for', 'wishes');
    label.textContent = 'И еще вот что';

    const wishes = document.createElement('div');
    label.classList.add('wishes');
    wishes.id = 'wishes';

    const wishesArea = document.createElement('textarea');
    label.classList.add('wishes-area');

    const wishesText = document.createElement('p');
    wishesText.classList.add('wishes-text');
    wishesText.textContent = '"Здесь будут отображены ваши желания"';

    beverage.appendChild(label);
    beverage.appendChild(wishes);
    wishes.appendChild(wishesArea);
    wishes.appendChild(wishesText);

    wishesArea.addEventListener('input', (event) => {
        wishesText.innerHTML = '"' + highlightKeywords(event.target.value) + '"';
    })
}

function highlightKeywords(text) {
    const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
    const regex = new RegExp(keywords.join('|'), 'gi');
    return text.replace(regex, match => `<b>${match}</b>`);
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