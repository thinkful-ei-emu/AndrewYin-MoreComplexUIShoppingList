handleNewItemSubmit()
  when the add item button is click 
  or if return is entered
    get the value in the input box, create a new shopping list item, add the item to STORE
    render shopping list

handleItemCheckClicked()
  when check is clicked
    set the checked property of the clicked item in STORE to the opposite
    then if checked is true change item class attr to include strikethrough
    else don't
  render shopping list

handleDeleteItemClicked()
  when delete is clicked
    remove item from STORE
    render shopping list


  findStoreIndex(param) {
    for (let i = 0; i < STORE.length; i++){
      if (li data-item-id === STORE[i].id)
        return i;
    }
  }

  STORE.splice(findStoreIndex(param), 1);