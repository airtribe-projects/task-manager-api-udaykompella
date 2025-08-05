# Simple Task Management API

A basic RESTful API for managing a list of tasks, built with Node.js and Express. The API performs CRUD (Create, Read, Update, Delete) operations on a task list that is read from a local `task.json` file.

## Prerequisites

- [Node.js](https://nodejs.org/)
- A package manager like `npm` or `yarn`

## Setup

1.  **Clone the repository** (or download the files).

2.  **Create a `task.json` file** in the root directory with the following structure:

    ```json
    {
      "tasks": [
        {
          "id": 1,
          "title": "Complete project setup",
          "description": "Initialize Node.js project and install dependencies.",
          "completed": true
        },
        {
          "id": 2,
          "title": "Develop API endpoints",
          "description": "Create all CRUD endpoints for tasks.",
          "completed": false
        }
      ]
    }
    ```

3.  **Install dependencies**:

    ```bash
    npm install
    ```

4.  **Start the server** (assuming your main file is `app.js`):
    ```bash
    node app.js
    ```
    The server will be running on `http://localhost:3000`.

## API Endpoints

### 1. Get All Tasks

- **Endpoint**: `GET /tasks`
- **Description**: Retrieves a list of all tasks.
- **Success Response** (`200 OK`):
  ```json
  [
    {
      "id": 1,
      "title": "Complete project setup",
      "description": "Initialize Node.js project and install dependencies.",
      "completed": true
    }
  ]
  ```

### 2. Get a Single Task

- **Endpoint**: `GET /tasks/:id`
- **Description**: Retrieves a single task by its `id`.
- **Success Response** (`200 OK`):
  ```json
  {
    "id": 1,
    "title": "Complete project setup",
    "description": "Initialize Node.js project and install dependencies.",
    "completed": true
  }
  ```
- **Error Response** (`404 Not Found`): If the task `id` does not exist.

### 3. Create a Task

- **Endpoint**: `POST /tasks`
- **Description**: Adds a new task to the list.
- **Request Body**:
  ```json
  {
    "id": 3,
    "title": "Write README",
    "description": "Create a clear and concise README file.",
    "completed": false
  }
  ```
- **Success Response** (`201 Created`): Returns the newly created task.
- **Error Response** (`400 Bad Request`): If `title`, `description`, or `completed` fields are missing.

### 4. Update a Task

- **Endpoint**: `PUT /tasks/:id`
- **Description**: Updates an existing task's details.
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "description": "This is the updated description.",
    "completed": true
  }
  ```
- **Success Response** (`200 OK`): Returns the updated task object.
- **Error Response** (`400 Bad Request`): If request body is invalid.
- **Error Response** (`404 Not Found`): If the task `id` does not exist.

### 5. Delete a Task

- **Endpoint**: `DELETE /tasks/:id`
- **Description**: Removes a task from the list.
- **Success Response** (`200 OK`): Returns the list of remaining tasks.
- **Error Response** (`404 Not Found`): If the task `id` does not exist.

---

### **Important Note on Data Persistence**

This is a simple in-memory implementation. The API reads data from `task.json` only on startup. Any new tasks created (`POST`), updated (`PUT`), or deleted (`DELETE`) **will not be written back to the `task.json` file**. These changes will be lost when the server is restarted.
