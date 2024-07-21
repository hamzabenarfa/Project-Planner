# Project-Planner

## Overview

Project-Planner is a full-stack web application designed to help users manage and plan their projects efficiently. The application includes features for project creation, team management, and user authentication.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [File Structure](#file-structure)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- User Authentication (Login and Registration)
- Project Management (Create, Update, Delete Projects)
- Team Management (Create, Update, Delete Teams)
- Assign Team Members to Projects

## Technology Stack

### Backend

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- TypeScript

### Frontend

- [Next.js](https://nextjs.org/)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/)

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Docker (optional for database setup)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/hamzabenarfa/Project-Planner.git
    cd Project-Planner
    ```

2. Install dependencies for both backend and frontend:

    ```bash
    # For backend
    cd backend
    npm install
    # or
    pnpm install

    # For frontend
    cd ../frontend
    npm install
    # or
    pnpm install
    ```

3. Set up the database:

    - Ensure you have a PostgreSQL database running.
    - Configure the database connection in `backend/prisma/schema.prisma`.
    - Run the migrations:

    ```bash
    cd backend
    npx prisma migrate dev
    ```

4. Run the backend and frontend servers:

    ```bash
    # In backend directory
    npm run start:dev

    # In frontend directory
    npm run dev
    ```

## Usage

Once the servers are running, you can access the application at `http://localhost:3000`.


## Contributing

We welcome contributions to Project-Planner! Please fork the repository and create a pull request for any changes you'd like to make.

## License

This project is licensed under the MIT License.

