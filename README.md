Here’s the updated README with the installation commands included:

---

# Job Portal Application

This repository contains both the **frontend** and **backend** for the Job Portal application. The frontend is built using React, and the backend is built using Node.js, Express, and MongoDB.

## Table of Contents

1. [Frontend](#frontend)
   - [Setup](#setup-frontend)
   - [Project Structure](#project-structure-frontend)
   - [Components](#components-frontend)
2. [Backend](#backend)
   - [Setup](#setup-backend)
   - [Project Structure](#project-structure-backend)
   - [API Routes](#api-routes-backend)
   - [Models](#models-backend)
   - [Middleware](#middleware-backend)
   - [Services](#services-backend)
   - [Environment Variables](#environment-variables-backend)

---

## Frontend

### Setup <a name="setup-frontend"></a>

1. Install the required dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. To build the application for production:

   ```bash
   npm run build
   ```

### Project Structure <a name="project-structure-frontend"></a>

- **`src/components/`**: Contains all React components.
- **`src/App.js`**: Main application component.
- **`src/index.js`**: Entry point of the application.

### Components <a name="components-frontend"></a>

#### SignUp

- Handles user registration and login functionality.

---

## Backend

### Setup <a name="setup-backend"></a>

1. Clone the repository and navigate to the server directory:

   ```bash
   git clone <repository-url>
   cd server
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set the required environment variables:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. For development with auto-restart:

   ```bash
   npm run dev
   ```

### Project Structure <a name="project-structure-backend"></a>

- **`server.js`**: The main entry point of the application.
- **`routes/`**: Contains all the route definitions for the API.
- **`models/`**: Defines MongoDB schemas for users and jobs.
- **`middleware/`**: Contains custom middleware functions like authentication.
- **`services/`**: Contains business logic and external service integrations, such as the email service.

### API Routes <a name="api-routes-backend"></a>

#### Authentication

- **Register**: Allows new users to register.
- **Verify OTP**: Verifies OTP for registration.
- **Login Request**: Requests an OTP for login.
- **Login Verify**: Verifies the OTP and logs the user in.

#### Jobs

- **Create Job**: Allows authenticated users to create a new job.
- **Get Jobs**: Retrieves all jobs for the authenticated user.
- **Send Email**: Sends an email to a single candidate.
- **Send All Emails**: Sends emails to all candidates for a particular job.

### Models <a name="models-backend"></a>

- **User**: Defines the schema for user information, including email, password, and OTP.
- **Job**: Defines the schema for job postings, including title, description, and candidate details.

### Middleware <a name="middleware-backend"></a>

- **Authentication Middleware**: Verifies JWT tokens to protect routes that require authentication.

### Services <a name="services-backend"></a>

- **Email Service**: Responsible for sending OTPs and candidate emails using an email provider (like Gmail) and credentials provided in the environment variables.

### Environment Variables <a name="environment-variables-backend"></a>

- **`MONGODB_URI`**: MongoDB connection string for database access.
- **`JWT_SECRET`**: Secret key for generating and verifying JWT tokens.
- **`EMAIL_USER`**: Email address used for sending emails.
- **`EMAIL_PASS`**: Password for the email account.

---

This README provides a complete overview of the setup, structure, and functionality of both the frontend and backend for the Job Portal application. Be sure to configure your environment variables properly and follow the setup instructions for each part of the project.
