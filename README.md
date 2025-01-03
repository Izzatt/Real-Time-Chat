# Chat Application

This is a real-time chat application built with React, Flask, and Socket.IO. The application supports user registration, login, and real-time messaging in chat rooms. It also provides a Docker setup for easy deployment.

---

## Features

- User Registration and Login
- Real-time messaging using WebSockets
- MongoDB integration for persistent chat storage
- Responsive UI built with React

---

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Setup and Installation

1. Clone the repository:

```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
```

2. Ensure Docker and Docker Compose are installed and running.

3. Build and start the containers:
```bash
docker-compose up --build
```

4. Open your browser and navigate to:
    - (http://localhost:3000)

## Docker Compose Setup
The application uses Docker Compose to manage the following services:

- frontend: React application running on port 3000.
- backend: Flask API server running on port 5000.
- mongo: MongoDB database.
You can find the configuration in the docker-compose.yml file.

## Environment Variables

Update the .env file in the root directory with the necessary configurations:

Backend

```bash
FLASK_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chat_app?retryWrites=true&w=majority
SECRET_KEY=your-secret-key
```
Frontend

```bash
REACT_APP_API_BASE_URL=http://localhost:5000
```

