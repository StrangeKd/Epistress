Epistress

This is a task management app built with Nuxt.js and powered by a PostgreSQL database. It allows users to create, view, update, and delete tasks, as well as set due dates.
Features

    Authenticate users with JWT
    Create, view, update, and delete tasks
    Set due dates and time limit for tasks
    View tasks sorted by due date

Prerequisites

    Node.js >= 12.x
    PostgreSQL >= 10.x

Installation

    Clone the repository: git clone https://github.com/
    Install the dependencies: npm install
    Run docker compose up api-db
    Run the database creation: npm run dev:create
    Start the app in development mode: npm run dev

Production

To build and start the app in production mode:

    Build the app: npm run build
    Start the app: npm start