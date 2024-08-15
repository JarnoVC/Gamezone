# GameZone API

This repository contains the server-side code for the **GameZone** project, an API built using Node.js, Express, and MongoDB. The API manages user authentication, product information, and order processing for the GameZone application.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running the Server](#running-the-server)
7. [API Documentation](#api-documentation)
8. [WebSocket Integration](#websocket-integration)
9. [Error Handling](#error-handling)
10. [Contributing](#contributing)
11. [License](#license)
12. [Contact](#contact)

## Project Overview

The **GameZone API** is a RESTful API that powers the GameZone web application. It provides endpoints for managing products, orders, and users, along with real-time updates via WebSocket for order changes.

## Features

- User Authentication (Signup, Login)
- Product Management (CRUD operations)
- Order Management (CRUD operations, status updates)
- Real-time order status updates using WebSocket
- Secure API with CORS and environment variable management

## Tech Stack

- **Node.js**: JavaScript runtime for server-side scripting.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store data.
- **Mongoose**: ODM for MongoDB.
- **Socket.IO**: For real-time communication between the server and clients.
- **Axios**: For handling HTTP requests on the front-end.
- **Dotenv**: For managing environment variables.

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local instance or MongoDB Atlas)
- Git

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/JarnoVC/Gamezone-frontend.git
   cd gamezone-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up MongoDB:**

   Ensure you have a MongoDB instance running. You can use a local MongoDB instance or a MongoDB Atlas cluster.

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```plaintext
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

- `PORT`: The port on which the server will run (default: 3000).
- `MONGODB_URI`: The URI for your MongoDB instance.
- `JWT_SECRET`: Secret key for JWT token signing.

## Running the Server

To start the server, use the following command:

```bash
node app.js
```

The server will start on the port specified in the `.env` file, or the default port 3000.

## API Documentation

The API provides the following endpoints:

### User Routes

- **POST** `/api/v1/auth/signup` - Register a new user.
- **POST** `/api/v1/auth/login` - Login a user and return a JWT.

### Product Routes

- **GET** `/api/v1/products` - Retrieve all products.
- **POST** `/api/v1/products` - Create a new product.
- **PUT** `/api/v1/products/:id` - Update a product by ID.
- **DELETE** `/api/v1/products/:id` - Delete a product by ID.

### Order Routes

- **GET** `/api/v1/orders` - Retrieve all orders.
- **POST** `/api/v1/orders` - Create a new order.
- **PUT** `/api/v1/orders/:id/status` - Update an order's status.
- **DELETE** `/api/v1/orders/:id` - Delete an order by ID.

### WebSocket Integration

Real-time updates are handled via WebSocket using Socket.IO. Whenever there’s a change in the `Order` collection (such as status updates), the connected clients are notified in real time.

### Error Handling

The server uses a centralized error handling middleware to catch and respond to errors appropriately. Common errors such as missing parameters or unauthorized access are handled with appropriate HTTP status codes.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes.
4. Submit a pull request with a detailed description of your changes.
