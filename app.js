let form = document.querySelector('#item-form');
let itemInput = document.querySelector('#item-input');
let itemList = document.querySelector('#item-list');
let clearButton = document.querySelector('.btn-clear');
let itemFilter = document.querySelector('.filter');
let filterInput = document.querySelector('.filter')
let formSubmitBtn = form.querySelector('.submit-btn')
let formEditBtn = form.querySelector('.edit-btn')
let isEditMode = false;


function displayItems() {
    let items = getItemsFromLocalStorage()
    items.forEach(item => renderItem(item))
}

function checkUI() {
    let items = getItemsFromLocalStorage();
    if (!isEditMode) {
        formEditBtn.style.display = 'none'
        formSubmitBtn.style.display = 'block'
    } else {
        formEditBtn.style.display = 'block'
        formEditBtn.style.backgroundColor = '#228B22'
        formSubmitBtn.style.display = 'none'
    }
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none'
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block'
    }
    itemInput.value = ''
}

function renderItem(text) {
    //Create new List Item
    if (!text) {
        alert('Please add an item')
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
    itemsFromStorage = itemsFromStorage.filter(i => i !== item)
    localStorage.setItem('shopItems', JSON.stringify(itemsFromStorage))
}

function getItemsFromLocalStorage() {
    let items = localStorage.getItem('shopItems') === null ? [] : JSON.parse(localStorage.getItem('shopItems'));
    console.log(items);
    return items;
}

function addItem() {
    let item = itemInput.value.trim();
    if (item.length) {
        //Add Item to the storage
        addItemToLocalStorage(item);
        renderItem(item);
        checkUI();
    }
}

let submitForm = (e) => {
    e.preventDefault();
    addItem()
}

function editItem(e) {
    e.preventDefault()
    let itemToEdit = itemList.querySelector('.edit-mode')
    removeItemFromLocalStorage(itemToEdit.textContent)
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove()
    isEditMode = false

    addItem()
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    checkUI()
    itemInput.value = item.textContent

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
    formSubmitBtn.addEventListener('click', submitForm)

    formEditBtn.addEventListener('click', editItem)

    //Event Listener on Remove Item
    itemList.addEventListener('click', onClickItem)

    //EL on Remove All 
    clearButton.addEventListener('click', removeAll)

    //EL on page
    document.addEventListener('DOMContentLoaded', displayItems);

    //EL on filter
    filterInput.addEventListener('input', filterItems)

    checkUI()
}

init()

