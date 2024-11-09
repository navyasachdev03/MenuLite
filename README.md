## MenuLite

MenuLite is a menu management and reservation booking system that allows users to view and manage menus, book tables, and manage reservations. This project supports user authentication, CRUD operations for menu items, and booking of reservations. It uses HTML, CSS, and JavaScript for the frontend, with Node.js and MongoDB for the backend.

### Features

- User Authentication: Secure registration and login functionality.
- Menu Management: Admins can add, update, and delete menu items.
- Reservation Booking: Users can book tables and manage their reservations.
- Responsive Design: The interface is optimized for use on different devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) installed
- [MongoDB](https://www.mongodb.com/try/download) installed 

### Tech Stack

- **Frontend:**
  - HTML/CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

### Installation

1. **Clone the Repository**

   ```bash
   https://github.com/navyasachdev03/MenuLite.git
   cd MenuLite
   ```

2. **Install Node Modules:**
    - Navigate to the `backend` folder and install the dependencies:
      ```sh
      cd backend
      npm install
      ```

### Running the application

1. **Setup Environment Variables:**
    - In the backend and frontend folders, create a file named `.env` and add the necessary variables (refer to the [Environment Variables](#environment-variables) section).

2. **Configure Backend URL:**
    - Navigate to the `frontend/config.js` file and update the url on which backend server will run
      ```js
        // your backend url
      window.apiUrl = 'https://localhost:3000';
      ```

3. **Start the Backend:**
    - In the `backend` folder, run the following command to start the backend server:
      ```sh
      npm start
      ```

4. **Access the Frontend:**
    - Open the index.html file in the frontend folder in your browser to start using the application.


## Environment Variables

Create a .env file inside the backend directory with the following variables:

```plaintext
MONGODB_URI=your_mongodb_uri       # The MongoDB connection string
PORT=3000                          # The port on which the backend server will run
```

- MONGODB_URI: The MongoDB connection string.
- PORT: The port on which the backend server will run.

> [!NOTE]
> The PORT value should be same as used in apiUrl variable in the config.js file.

## Folder Structure

```plaintext
menulite/
├── backend/                # Backend folder
│   ├── .env                # Environment variables
│   └── index.js            # Full backend server configuration and services
│
└── frontend/               # Frontend folder
    ├── images/             # Images and assets
    ├── config.js           # API URL configuration
    ├── index.html          # Home page
    ├── menu.html           # Menu management page
    ├── user.html           # User profile and bookings
    ├── script.js           # JavaScript file for integration
    └── styles.css          # Stylesheet
```

## Deployed Website

The MenuLite application has been deployed on Vercel. It can be accessed through the following url: https://menu-lite.vercel.app

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bugs, or enhancements.