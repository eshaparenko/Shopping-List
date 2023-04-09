let form = document.querySelector('#item-form');
let itemInput = document.querySelector('#item-input');
let itemList = document.querySelector('#item-list');

//Event Listeners on form submit
form.addEventListener('submit', (e) => {
    //Create new List Item

    if (!itemInput.value.trim()) {
        alert('Please add na item')
        return;
    }

    let li = document.createElement('li');
    li.textContent = itemInput.value.trim();
    let button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';
    let i = document.createElement('i');
    i.className = 'fa-solid fa-xmark';
    button.appendChild(i);
    li.appendChild(button);

    //Add new List Item to the List
    itemList.appendChild(li);

    //Clear Item Input
    itemInput.value = ''

    e.preventDefault();
})




