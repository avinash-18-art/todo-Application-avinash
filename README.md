# Todo Web Application

A Todo Web Application built with ReactJS for the frontend and Node.js with Express for the backend. The application allows users to manage their daily tasks with features such as user authentication, task management, and profile management.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Author](#author)

## Features

- User Authentication
  - Signup and login functionalities using JWT tokens.
  - Protected routes to ensure only authenticated users can access certain features.

- Todo Management
  - Create, read, update, and delete (CRUD) operations for managing tasks.
  - Task status management with options like "done," "pending," "in progress," and "completed."

- User Profile Management
  - Update user profile information, including name, email, and password.

## Technologies

- **Frontend**: 
  - ReactJS
  - React Router
  - Axios

- **Backend**: 
  - Node.js
  - Express.js
  - SQLite3

- **Authentication**:
  - JWT (JSON Web Tokens)

- **Utilities**:
  - UUID for generating unique task IDs

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/avinash-18-art/todo-Application-avinash.git
   cd todo-web-application

## project Structure:
/todo-app
  /backend
    - app.js
    - routes
      - authRoutes.js
      - taskRoutes.js
      - profileRoutes.js
    - controllers
      - authController.js
      - taskController.js
      - profileController.js
    - models
      - userModel.js
      - taskModel.js
    - middlewares
      - authMiddleware.js
    - database
      - db.js
  /frontend
    /src
      - App.js
      - components
        - TaskManager.js
        - TaskItem.js
        - Profile.js
        - Login.js
        - Signup.js
      - services
        - authService.js
        - taskService.js
        - profileService.js
      - App.css
      - index.js
  - package.json
   
## Install frontend dependencies:
cd frontend
npm install
## Install backend dependencies:

cd backend
npm install

## Usage:
cd backend
node server.js

## Start the frontend application:
cd frontend
npm start

## Access the application:
Open your web browser and go to http://localhost:3000 to access the Todo Web Application.

## API Endpoints:
Authentication
POST /api/auth/signup: Create a new user.
POST /api/auth/login: Authenticate user and receive a JWT token.
Tasks
GET /api/tasks: Get all tasks.
POST /api/tasks: Create a new task.
PUT /api/tasks/:taskId: Update an existing task.

DELETE /api/tasks/:taskId: Delete a task.


User Profile
GET /api/profile: Get user profile information.
PUT /api/profile: Update user profile information.
DELETE /api/profile: Delete user profile.

## License:
This project is licensed under the MIT License.

## Author:
Avinash Chauhan 
linkedin.com/in/avinash-chauhan-5814a4240
https://github.com/avinash-18-art


---

### Explanation:

1. **Project Title and Description**: A brief overview of the Todo Web Application.

2. **Table of Contents**: Lists the sections for easy navigation.

3. **Features**: Describes the main features of the application.

4. **Technologies**: Lists the technologies used in the project.

5. **Installation**: Provides step-by-step instructions to clone the repository and install dependencies for both the frontend and backend.

6. **Usage**: Instructions to start the backend and frontend servers, along with how to access the application.

7. **API Endpoints**: Describes the available API endpoints for authentication, task management, and user profile management.

8. **License**: Indicates the license type for the project.

9. **Author**: Your name and links to your GitHub and LinkedIn profiles.

---

Feel free to modify any sections to better fit your project and personal details! Let me know if you have any questions or need further assistance.

