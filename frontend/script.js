let userName;

async function registerUser() {
    const username = document.getElementById('name').value;
    const usermail = document.getElementById('mail').value;
    const usercontact = document.getElementById('contact').value;
    const userpwd = document.getElementById('pwd').value;

    const newUser = {
        name: username,
        mail: usermail,
        contact: usercontact,
        pwd: userpwd
    }

    const data = JSON.stringify(newUser);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/register`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log('Signup Successful...', xhr.responseText);
            const responseJson = JSON.parse(xhr.responseText);
            alert('Account created successfully!');
            getUserName(responseJson.user.name);
        } 
        else if(xhr.status === 409){
            console.error('Conflict', xhr.status);
            alert('User with mail already exists. Use a different mail!');
        }
        else {
            console.error('Failed', xhr.status);
            alert('Error creating an account.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error creating an account.');
    };

    try {
        xhr.send(data);
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}




async function loginUser() {
    const loginMail = document.getElementById('loginMail').value;
    const loginPwd = document.getElementById('loginPwd').value;

    const loginUser = {
        mail: loginMail,
        pwd: loginPwd
    }

    const data = JSON.stringify(loginUser);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/login`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Login Successful...', xhr.responseText);
            const responseJson = JSON.parse(xhr.responseText);
            alert('Account Login successful!');
            getUserName(responseJson.user.name);
        } 
        else if (xhr.status === 401) {
            console.error('Unauthorized', xhr.status);
            alert('Invalid credentials. Please try again.');
        } 
        else {
            console.error('Failed', xhr.status);
            alert('Error logging into account.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error logging into account.');
    };

    try {
        xhr.send(data);
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }

}


function getUserName(name){
    userName = name;
    window.location.href = `index.html?name=${encodeURIComponent(userName)}`;
}


document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get('name');

    const userNameDisplay = document.getElementById('displayUser');

    if (userNameDisplay && userName) {
        userNameDisplay.innerText = `${userName},`;
    }
});


function logout(){
    userName = null;
    alert('Logout Successful!');
    window.location.href = 'index.html';
}


function addItem() {
        const itemSerialNo = document.getElementById('itemSerialNo').value;
        const itemName = document.getElementById('itemName').value;
        const itemDescription = document.getElementById('itemDescription').value;
        const itemIngredients = document.getElementById('itemIngredients').value;
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);
        const itemCategory = document.getElementById('itemCategory').value;

        const newItem = {
            serialNo: itemSerialNo,
            name: itemName,
            description: itemDescription,
            ingredients: itemIngredients,
            price: itemPrice,
            category: itemCategory
        };

        const data = JSON.stringify(newItem);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiUrl}/addItem`);
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
    const itemSerialNo = document.getElementById('itemSerialNo2').value;
    const itemName = document.getElementById('itemName2').value;
    const itemDescription = document.getElementById('itemDescription2').value;
    const itemIngredients = document.getElementById('itemIngredients2').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice2').value);
    const itemCategory = document.getElementById('itemCategory2').value;

    const updatedItem = {
        serialNo: itemSerialNo,
        name: itemName,
        description: itemDescription,
        ingredients: itemIngredients,
        price: itemPrice,
        category: itemCategory
    };

    const data = JSON.stringify(updatedItem);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', `${apiUrl}/updateItem/${itemSerialNo}`);
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

    if(items.length!=0){
        itemContainer.innerHTML = '';
        const itemList = document.createElement('ul');
    
        items.forEach(item => {
            const listItem = document.createElement('li');
            const nestedList = document.createElement('ul');
    
            const fieldsToDisplay = ['serialNo', 'name', 'description', 'ingredients', 'price', 'category'];
    
            fieldsToDisplay.forEach(field => {
                const nestedItem = document.createElement('li');
                nestedItem.textContent = `${field}: ${item[field] || ''}`;
                nestedList.appendChild(nestedItem);
            });
    
            listItem.appendChild(nestedList);
            itemList.appendChild(listItem);
        });
    
        itemContainer.appendChild(itemList);
    
        if (!document.getElementById('itemContainer')) {
            document.body.appendChild(itemContainer);
        }
    } else{
        itemContainer.innerHTML = 'No menu items to show';
    }

}




function viewAllItems() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/getAllItems`);
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
    xhr.open('GET', `${apiUrl}/getItem/${category}`);
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

    const itemSerialNo = document.getElementById('itemSerialNo4').value;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${apiUrl}/deleteItem/${itemSerialNo}`);
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




async function bookAppointment() {
    const userName = document.getElementById('name').value;
    const guestsNo = document.getElementById('number').value;
    const selectedDate = document.getElementById('date').value;
    const selectedTime = document.getElementById('time').value;

    const newAppointment = {
        name: userName,
        guests: guestsNo,
        date: selectedDate,
        time: selectedTime
    };

    const data = JSON.stringify(newAppointment);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/book-appointment`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 201) {
            console.log('Appointment booked successfully...', xhr.responseText);
            alert('Appointment booked successfully!');
        } else if (xhr.status === 409) {
            console.error('Conflict', xhr.status);
            alert('All tables for given time are reserved. Please choose a different time.');
        } else {
            console.error('Failed', xhr.status);
            alert('Error booking appointment.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error booking appointment.');
    };

    try {
        xhr.send(data);
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}



async function viewAppointment() {

    const userName = document.getElementById('name2').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/view-appointment/${userName}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const appointment = JSON.parse(xhr.responseText);
            const bookedDate = new Date(appointment.date).toLocaleDateString();
            alert(`Appointment booked at ${bookedDate} on ${appointment.time}`);
        } else if (xhr.status === 404) {
            console.error('Not Found', xhr.status);
            alert('No appointment found.');
        } else {
            console.error('Failed', xhr.status);
            alert('Error viewing appointment.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error viewing appointment.');
    };

    try {
        xhr.send();
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}



async function delAppointment() {
    const userName = document.getElementById('name2').value;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${apiUrl}/delete-appointment/${userName}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Appointment deleted successfully!');
        } else if (xhr.status === 404) {
            console.error('Not Found', xhr.status);
            alert('No appointment found to delete.');
        } else {
            console.error('Failed', xhr.status);
            alert('Error deleting appointment.');
        }
    };

    xhr.onerror = function () {
        console.error('Request failed...');
        alert('Error deleting appointment.');
    };

    try {
        xhr.send();
    } catch (error) {
        console.error('Error sending request:', error);
        alert('An unexpected error occurred. Please try again.');
    }
}


