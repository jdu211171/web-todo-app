# Task Management App

A simple, minimalist task management application that allows users to create, read, update, and delete tasks. This project was developed as part of an assignment.

## Features

- Create new tasks with name, description, due date, and status
- View a list of all tasks with filtering options
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Persistent storage using SQLite
- Responsive design that works on both desktop and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: SQLite
- **Version Control**: Git, GitHub

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```
   The server will run on http://localhost:5000

2. In a separate terminal, start the frontend:
   ```
   cd client
   npm start
   ```
   The client will run on http://localhost:3000

3. Open your browser and navigate to http://localhost:3000 to use the application

## API Endpoints

- `GET /api/tasks` - Get all tasks (with optional filters)
- `GET /api/tasks/:id` - Get a specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
task-management-app/
├── client/                 # Frontend - React + TypeScript
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── services/       # API service calls
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx         # Main App component
│   │   └── index.tsx       # Entry point
│
├── server/                 # Backend - Express + TypeScript
│   ├── src/                # Source code
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── db/             # Database setup
│   │   ├── types/          # TypeScript interfaces
│   │   ├── app.ts          # Express app setup
│   │   └── server.ts       # Server entry point
│
├── .gitignore
└── README.md
```
