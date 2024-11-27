## MenuLite

MenuLite is a menu management and reservation booking system that allows users to view and manage menus, book tables, and manage reservations. This project supports user authentication, CRUD operations for menu items, and booking of reservations. It uses React.js and Tailwind for the frontend, with Node.js and MongoDB for the backend.

### Features

- User Authentication: Secure registration and login functionality.
- Menu Management: Admins can add, update, and delete menu items.
- Reservation Booking: Users can book tables and manage their reservations.
- Responsive Design: The interface is optimized for use on different devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download) installed
- [MongoDB](https://www.mongodb.com/try/download) installed 
- An account on [Cloudinary](https://cloudinary.com)

### Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS
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
    - Navigate to the `frontend` folder and install the dependencies:
      ```sh
      cd frontend
      npm install
      ```
    - Navigate to the `backend` folder and install the dependencies:
      ```sh
      cd ../backend
      npm install
      ```


### Running the application

1. **Setup Environment Variables:**
    - In the backend and frontend folders, create a file named `.env` and add the necessary variables (refer to the [Environment Variables](#environment-variables) section).

2. **Start the Backend:**
    - In the `backend` folder, run the following command to start the backend server:
      ```sh
      npm start
      ```

3. **Start the Frontend:**
    - In the `frontend` folder, run the following command to start the frontend development server:
      ```sh
      npm start
      ```

4. Open your browser and navigate to http://localhost:3000 to access the MenuLite website.

## Environment Variables

Create a .env file inside the backend directory with the following variables:

```plaintext
MONGODB_URI=your_mongodb_uri                      # The MongoDB connection string
PORT=3000                                         # The port on which the backend server will run
CLOUDINARY_CLOUD_NAME=your_cloudinary_name        # Cloudinary cloud name
CLOUDINARY_CLOUD_KEY=your_cloudinary_key          # Cloudinary API key
CLOUDINARY_CLOUD_SECRET=your_cloudinary_secret    # Cloudinary API secret
```

- MONGODB_URI: The MongoDB connection string.
- PORT: The port on which the backend server will run.
- CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name for image storage.
- CLOUDINARY_CLOUD_KEY: Your Cloudinary API key.
- CLOUDINARY_CLOUD_SECRET: Your Cloudinary API secret.

Similarly, create a .env file inside the frontend directory with the following variable:

```plaintext
REACT_APP_BACKEND_URL=your_backend_url         # Url on which backend server will run
```

> [!NOTE]
> If running on localhost, set the backend url as http://localhost:3000

## Folder Structure

```plaintext
menulite/
├── backend/                   # Backend folder
│   ├── .env                   # Environment variables
│   └── src/
│       ├── models/            # Mongoose models
│       ├── routes/            # Express routes
│       ├── controllers/       # Controllers for handling requests
│       ├── middlewares/       # Custom Middlewares
│       ├── config/            # Connecting to database
│       ├── utils/             # Utility functions
│       └──  index.js          # Entry point for the backend
│
└── frontend/                  # Frontend folder
    ├── .env                   # Environment variables
    ├── public/                # Public assets and images
    ├── src/                   # React components and pages
    │   ├── components/        # Reusable components
    │   ├── pages/             # Main project pages
    │   └── App.js             # Main Application file 
    ├── ApiBaseURL.js          # Base URL for API Request           
    └── tailwind.config.js     # Tailwind CSS configuration file
```

## Deployed Website

The MenuLite application has been deployed on Vercel. It can be accessed through the following url: https://menu-lite.vercel.app

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bugs, or enhancements.