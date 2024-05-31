# TaskFlow App

## Overview
TaskFlow is a comprehensive task management application designed to streamline project workflows and enhance productivity for teams and individuals alike. The application is versatile, supporting various functionalities that aid in project management, including task assignment, progress tracking, and collaboration. **Currently, the project is under development.**

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org) (version 20.x or newer)
- [PostgreSQL](https://www.postgresql.org) (version 16 or newer)

## Getting Started

### 1. Clone the Repository
Start by cloning the repository to your local machine:
```bash
git clone https://github.com/suxrobGM/taskflow-app.git
cd taskflow-app
```

### 2. Install Dependencies
Install all required npm packages:
```bash
npm install
```

### 3. Set Up Auth0
TaskFlow uses Auth0 for user authentication. Follow these steps to set it up:
- Create a regular web application in the Auth0 dashboard.
- Obtain the `AUTH0_SECRET`, `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, and `AUTH0_CLIENT_SECRET` from your Auth0 application settings.

Update the `.env` file with your Auth0 credentials:
```plaintext
AUTH0_SECRET=your_auth0_secret
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

### 4. Configure the Database
Create a PostgreSQL database named **TaskflowDB**. Update the database connection settings in the [DataSource](./src/persistence/DataSource.ts) configuration file:
```typescript
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'TaskflowDB'
})
```

### 5. Run Database Migrations
Apply the database migrations to set up your database schema:
```bash
npm run migration:apply
```

### 6. Start the Development Server
Launch the development server by running:
```bash
npm run dev
```

### 7. Access the Application
Open a web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.
