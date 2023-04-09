let form = document.querySelector('#item-form');
let itemInput = document.querySelector('#item-input');
let itemList = document.querySelector('#item-list');
let clearButton = document.querySelector('.btn-clear');
let itemFilter = document.querySelector('.filter');
let filterInput = document.querySelector('.filter')


function checkUI() {
    let items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none'
    } else {
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block'
    }
}
 
//Event Listener on form submit
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

    checkUI()
    //Clear Item Input
    itemInput.value = ''

    e.preventDefault();
})

//Event Listener on Remove Item
itemList.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }        
    }
})

//EL on Remove All 
clearButton.addEventListener('click', () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    checkUI();
})

//EL on page
document.addEventListener('DOMContentLoaded', checkUI);


//EL on filter
filterInput.addEventListener('input', (e) => {
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

})




