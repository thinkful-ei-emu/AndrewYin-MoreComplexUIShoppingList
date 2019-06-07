/* eslint-disable no-console */
'use strict';

const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false},
    {id: cuid(), name: 'oranges', checked: false},
    {id: cuid(), name: 'milk', checked: true},
    {id: cuid(), name: 'bread', checked: false}
  ],
  hideChecked: false,
  searchTerm: ''
};


function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {

  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join('');
}

/**
 * renders the input array on the page
 * defaults to STORE.items if no array is given
 * @param {array} render 
 */
function renderShoppingList() {
  // render the shopping list in the DOM
  let filteredItems = STORE.items;
  filteredItems = STORE.hideChecked ? filteredItems.filter(item => !item.checked) : filteredItems;
  filteredItems = STORE.searchTerm ? filteredItems.filter(item => item.name === STORE.searchTerm) : filteredItems;

  const shoppingListItemsString = generateShoppingItemsString(filteredItems);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  STORE.items.push({id: cuid(), name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}

/**
 * returns the item id of the given html element
 * @param {html} item 
 */
function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .attr('data-item-id');
}
/**
 * adds strikethrough class to clicked item
 */
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}


/**
 * deletes the clicked item from STORE.list
 */
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item

  $('.js-shopping-list').on('click', '.js-item-delete', event=>{
    const itemId = getItemIdFromElement(event.target);
    const item = STORE.items.find(item => item.id === itemId);
    const index = STORE.items.indexOf(item);
    STORE.items.splice(index,1);
    renderShoppingList();
    
  });
}


/**
 * set STORE.hideChecked to the oppposite
 */
function toggleHideChecked() {
  STORE.hideChecked = !STORE.hideChecked;
}


/**
 * listens to the hide checked checkbox and flips hideChecked in STORE
 */
function handleHideCheckbox() {
  $('#shopping-list-hide').click(function () {
    toggleHideChecked();
    renderShoppingList();
    // STORE.hideChecked ? renderShoppingList(STORE.items.filter(item => !item.checked)) : renderShoppingList();
  });
}
function handleHideChecked(){
  $('#hide-checked-label').click(function() {
    $('#shopping-list-hide').click();
    // toggleHideChecked();
    // STORE.hideChecked ? renderShoppingList(STORE.items.filter(item => item.checked)) : renderShoppingList();
  });
}


/**
 * listens for submissions on search and filters through 
 */
function handleSearchSubmit() {
  $('#js-search-form').submit(function(event) {
    event.preventDefault();

    let search = $('#js-shopping-list-search').val();
    $('#js-shopping-list-search').val('');
    STORE.searchTerm = search;
    renderShoppingList();
  });
}


/**
 * listens for edit button to be clicked and allows edit to item name
 */
function handleEditItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-edit', function() {
    let edit = window.prompt('Edit Item', '');
    const itemId = getItemIdFromElement(event.target);
    const item = STORE.items.find(item => item.id === itemId);
    if (edit) {
      item.name = edit;
      renderShoppingList();
    }
  });
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleSearchSubmit();
  handleHideCheckbox();
  handleHideChecked();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditItemClicked();
}


// when the page loads, call `handleShoppingList`
$(handleShoppingList);