# TravelGo

TravelGo is a web application designed to help users find and book properties for travel. It is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and offers features similar to those found on Airbnb, including the ability to search for properties, book stays, and add properties for rent.

![image](https://github.com/user-attachments/assets/574800fe-53b8-4fa4-8be0-ec3296ef355e)


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Acknowledgements](#acknowledgements)

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Property Listings**: Users can search for properties based on location, price, and other criteria.
- **Add Property**: Users can list their properties for rent, complete with images and descriptions.
- **Wishlist**: Users can save properties to a wishlist for future reference.
- **Responsive Design**: The application adapts to various screen sizes for a seamless experience.

## Technologies Used

- **MongoDB**: NoSQL database for storing user and property data.
- **Express.js**: Web application framework for Node.js, used to build the backend API.
- **React.js**: JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime environment for executing server-side code.
- **Redux**: State management library for managing application state.
- **Cloudinary**: For handling media uploads such as property images.
- **JWT**: For user authentication and authorization.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/vishwakarma-vishal/travel-go.git
    ```
2. Navigate to the project directory:
    ```bash
    cd travel-go
    ```
3. Install the dependencies for both the client and server:
    ```bash
    # For the client
    cd frontend
    npm install

    # For the server
    cd ../backend
    npm install
    ```
4. Create a `.env` file in the `backend` directory and add your environment variables (e.g., MongoDB URI, JWT Secret, Cloudinary credentials).

5. Start the development servers:
    ```bash
    # Start the server
    cd ../backend
    npm run dev

    # Start the client
    cd ../frontend
    npm run dev
    ```
6. Open your browser and go to `http://localhost:3000` to view the app.

## Usage

Once the application is running, you can:

- Sign up or log in as a user.
- Search for properties based on your travel destination.
- View property details, including images, descriptions, and amenities.
- Add your own property for rent.
- Save properties to your wishlist.
- Book a property for your stay.

## Folder Structure

```plaintext
travel-go/
├── frontend/              # React frontend
│   ├── public/            # Public assets
│   ├── src/               # Source files
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Application pages
│   │   ├── redux/         # Redux state management
│   │   ├── style/         # Styling files
│   │   ├── App.jsx        # Main App component
│   │   ├── App.css        # Application styling
│   │   ├── index.jsx      # Entry point of the React app
│   │   └── data.jsx       # Contains property types and categories
│   ├── .eslintrc.cjs
│   ├── _redirects
│   ├── index.html
│   ├── package-lock.json
│   └── package.json
├── backend/              # Express backend
│   ├── config/          # Configuration files (e.g., database, JWT)
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── package-lock.json
│   ├── package.json
│   └── server.js        # Main server file
├── .gitignore
└── README.md
```
## Acknowledgements
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Redux](https://redux.js.org/)
- [Cloudinary](https://cloudinary.com/)
- [JWT](https://jwt.io/)
