let form = document.querySelector('#item-form');
let itemInput = document.querySelector('#item-input');
let itemList = document.querySelector('#item-list');
let clearButton = document.querySelector('.btn-clear');
let itemFilter = document.querySelector('.filter');
let filterInput = document.querySelector('.filter')


function displayItems() {
    getItemsFromLocalStorage().forEach(item => {
        renderItems(item)
    })
}

function checkUI() {
    let items = getItemsFromLocalStorage();
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none'
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block'
    }
}

function renderItems(text) {
    //Create new List Item
    if (!text.trim()) {
        alert('Please add na item')
        return;
    }

    let li = document.createElement('li');
    li.textContent = text
    let button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';
    let i = document.createElement('i');
    i.className = 'fa-solid fa-xmark';
    button.appendChild(i);
    li.appendChild(button);

    //Add new List Item to the List
    itemList.appendChild(li);
}

function addItemToLocalStorage(item) {
    let itemsFromStorage = getItemsFromLocalStorage()
    itemsFromStorage.push(item)
    localStorage.setItem('shopItems', JSON.stringify(itemsFromStorage))
}

function removeItemFromLocalStorage(item) {
    let itemsFromStorage = getItemsFromLocalStorage()
    itemsFromStorage = itemsFromStorage.filter(i => i !==item)
    localStorage.setItem('shopItems', JSON.stringify(itemsFromStorage))
}

function getItemsFromLocalStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('shopItems') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('shopItems'))
    }
    return itemsFromStorage;
}

let submitForm = (e) => {
    e.preventDefault();
    let item = itemInput.value.trim();
    //Add Item to the storage
    addItemToLocalStorage(item);
    renderItems(item);
    checkUI();
    //Clear Item Input
    itemInput.value = ''
}

function onClickRemoveIcon(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    }
}

function removeItem(item) {
    if(confirm('Are you sure?')) {
        item.remove();
        removeItemFromLocalStorage(item.textContent)
        checkUI();
    }
}

let removeAll = () => {
    if(confirm('Are you sure?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild)
        }
        //Clear from Local Storage
        localStorage.removeItem('shopItems')
        checkUI();
    }   
}

let filterItems = (e) => {
    let text = e.target.value.toLowerCase();
    let items = itemList.querySelectorAll('li')
    items.forEach(item => {
        let itemName = item.firstChild.textContent.toLowerCase()
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}

function init() {
    //Event Listener on form submit
    form.addEventListener('submit', submitForm)

    //Event Listener on Remove Item
    itemList.addEventListener('click', onClickRemoveIcon)

    //EL on Remove All 
    clearButton.addEventListener('click', removeAll)

    //EL on page
    document.addEventListener('DOMContentLoaded', displayItems);

    //EL on filter
    filterInput.addEventListener('input', filterItems)

    checkUI()
}

init()

