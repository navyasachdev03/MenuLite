function addItem() {
        const itemName = document.getElementById('itemName').value;
        const itemDescription = document.getElementById('itemDescription').value;
        const itemIngredients = document.getElementById('itemIngredients').value;
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);
        const itemCategory = document.getElementById('itemCategory').value;

        const newItem = {
            name: itemName,
            description: itemDescription,
            ingredients: itemIngredients,
            price: itemPrice,
            category: itemCategory
        };

        const data = JSON.stringify(newItem);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/menu-items');
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 201) {
                console.log('Request Successful...', xhr.responseText);
                alert('Menu item added successfully!');
            } 
            else {
                console.error('Failed', xhr.status);
                alert('Error adding menu item.');
            }
        };

        xhr.onerror = function () {
            console.error('Request failed...');
            alert('Error adding menu item.');
        };

        xhr.send(data);
}


function updateItem() {
    const itemId = document.getElementById('itemId').value;
    const itemName = document.getElementById('itemName2').value;
    const itemDescription = document.getElementById('itemDescription2').value;
    const itemIngredients = document.getElementById('itemIngredients2').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice2').value);
    const itemCategory = document.getElementById('itemCategory2').value;

    const updatedItem = {
        id: itemId,
        name: itemName,
        description: itemDescription,
        ingredients: itemIngredients,
        price: itemPrice,
        category: itemCategory
    };

    const data = JSON.stringify(updatedItem);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:5000/menu-items/${itemId}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Request Successfull...', xhr.responseText);
            alert('Menu item updated successfully!');
        } 
        else {
            console.error('Failed', xhr.status);
            alert('Error updating menu item.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error updating menu item.');
    };

    xhr.send(data);
}


function displayItems(items) {

    const itemContainer = document.getElementById('itemContainer') || document.createElement('div');
    itemContainer.id = 'itemContainer';

    itemContainer.innerHTML = '';
    const itemList = document.createElement('ul');

    items.forEach(item => {
        const listItem = document.createElement('li');
        const nestedList = document.createElement('ul');

        for (const [key, value] of Object.entries(item)) {
            const nestedItem = document.createElement('li');
            nestedItem.textContent = `${key}: ${value}`;
            nestedList.appendChild(nestedItem);
        }

        listItem.appendChild(nestedList);
        itemList.appendChild(listItem);
    });

    itemContainer.appendChild(itemList);

    if (!document.getElementById('itemContainer')) {
        document.body.appendChild(itemContainer);
    }
}




function viewAllItems() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/menu-items');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const items = JSON.parse(xhr.responseText);
            displayItems(items);
        } 
        else {
            console.error('Failed', xhr.status);
            alert('Error displaying menu items.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error displaying menu items.');
    };

    xhr.send();
}




function viewCategoryItems() {

    const category = document.getElementById('itemCategory3').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:5000/menu-items/${category}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const items = JSON.parse(xhr.responseText);
            displayItems(items);
        } 
        else {
            console.error('Failed', xhr.status);
            alert('Error fetching menu items.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error fetching menu items.');
    };

    xhr.send();
}




function delItem() {

    const itemId = document.getElementById('itemId4').value;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:5000/menu-items/${itemId}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const deletedItem = JSON.parse(xhr.responseText);
            alert(`Item ${deletedItem.id} deleted successfully.`);
        } 
        else {
            console.error('Failed', xhr.status);
            alert('Error deleting menu item.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error deleting menu item.');
    };

    xhr.send();
}


