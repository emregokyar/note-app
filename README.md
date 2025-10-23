# Full-Stack Notes Application

A full-stack **Note Management App** that allows users to **CRUD notes** securely.
Users can **register and log in using traditional credentials or Google OAuth 2.0**, ensuring a smooth and flexible authentication experience.

The project demonstrates a **clean separation between frontend and backend**, follows **RESTful API best practices**, and is **fully containerized with Docker** for easy setup and deployment.

---

## Features

- **Secure User Authentication**
  - Local registration and login (email/password) with JWT.
  - Social login with **Google OAuth 2.0**.
   **Full CRUD Note Management**
  - Create, view, edit, and delete notes.
  - All notes are user-specific and private.
-  **Containerized Environment**
  - Includes `Dockerfile` for both frontend and backend.
  - A `docker-compose.yml` file starts the entire stack (React, Node, Postgres) with a single command.
- **Best Practices**
  - RESTful API architecture.
  - Secure environment variable handling.
  - Clean, scalable project structure.

---

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend**       | React, Context API, Axios |
| **Backend**        | Node.js, Express.js, PostgreSQL |
| **Authentication** | JWT (JSON Web Tokens), bcrypt, Google OAuth 2.0 |
| **DevOps** | Git, Docker, Docker Compose |

---

## Architecture

This application follows a classic client-server model:

1.  **Frontend (Client):** A **React** single-page application (SPA) that provides the user interface. It uses **Axios** to make HTTP requests to the backend API and **Context API** for state management.
2.  **Backend (Server):** A **Node.js/Express** RESTful API that handles all business logic, authentication, and database operations.
3.  **Database:** A **PostgreSQL** database stores all user information and note data.
4.  **Authentication:** Users are authenticated via **JWT** for local logins or **Google OAuth 2.0** for social logins.

---

## Getting Started

You can get the project running in two ways: with Docker (recommended) or by setting up the services manually.


### 1. Clone the Repository

```bash
git clone https://github.com/emregokyar/note-app.git
cd note-app 
```
### 2. Environment Variables
You need to create .env files for both the backend and frontend. Also to use Docker Compose, you need to create .env root folder as well.

### 3. Run the Application
Choose one of the following options:

#### Option 1: Run with Docker (Recommended) 
This is the simplest method. It builds the containers for the frontend, backend, and a Postgres database and runs them all.

```bash
docker compose up
```


#### Option 2: Manual Local Setup
You must have your own PostgreSQL server running locally for this option. You need to go both folder to install dependencies.

```bash
cd ./backend
npm install
node index.js
```

```bash
cd ./frontend
npm install
npm run dev
```


