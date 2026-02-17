🔐 Secure Login & Log Monitoring System

A security-focused backend authentication system built using Node.js, MySQL, JWT, and structured file-based logging with Splunk SIEM integration.

This project demonstrates secure authentication, persistent user storage, audit logging, and real-time log monitoring — simulating a real-world security monitoring workflow.

---

## 📌 Project Overview

The Secure Login & Log Monitoring System is a backend application designed to implement secure user authentication and structured security event logging.

It includes:

* User registration and login APIs
* Password hashing using bcrypt
* JWT-based stateless authentication
* MySQL database integration
* Structured file-based logging
* Splunk SIEM monitoring for security events

This project bridges backend development with practical cybersecurity monitoring concepts.

---

## 🏗️ Architecture

```
Client (Thunder Client / Postman)
        ↓
Express API (Node.js)
        ↓
Authentication Controller
        ↓
MySQL Database (User Storage)
        ↓
Structured Logger → auth.log
        ↓
Splunk SIEM (Log Monitoring & Analysis)
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* bcryptjs (Password Hashing)
* jsonwebtoken (JWT Authentication)
* dotenv (Environment Configuration)
* Splunk (SIEM Monitoring)
* Git & GitHub

---

## 🔒 Security Features Implemented

* Password hashing using bcrypt (salt rounds = 10)
* JWT-based stateless authentication (1-hour expiry)
* Protected route middleware using token verification
* Parameterized SQL queries (prevents SQL Injection)
* Structured ISO timestamp-based logging
* Secure environment variable handling using `.env`
* Secrets excluded using `.gitignore`

---

## 📂 Project Structure

```
secure-login-log-monitor/
│
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │     └── db.js
│   ├── controllers/
│   │     └── authController.js
│   ├── middleware/
│   │     └── authMiddleware.js
│   ├── routes/
│   │     └── authRoutes.js
│   └── logs/
│         └── logger.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 📊 Logging Format

Authentication events are written to `auth.log` in structured ISO timestamp format:

```
[2026-02-15T12:08:47.698Z] REGISTER SUCCESS - User: admin
[2026-02-15T12:10:03.121Z] LOGIN FAILED - Wrong password: admin
[2026-02-15T12:11:18.432Z] LOGIN SUCCESS - User logged in: admin
```

Logs are monitored in Splunk using a custom sourcetype (`auth_log`).

---

## 🔍 Splunk Monitoring

Splunk is configured to:

* Continuously monitor `auth.log`
* Parse structured authentication events
* Allow searching and filtering security activities

Example searches:

```
index=* sourcetype=auth_log
index=* "LOGIN FAILED"
index=* "LOGIN SUCCESS"
```

---

## 🧪 API Endpoints

### Register User

```
POST /auth/register
```

Request Body:

```
{
  "username": "admin",
  "password": "password123"
}
```

---

### Login User

```
POST /auth/login
```

Returns JWT token on successful authentication.

---

### Protected Route

Requires:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚙️ Environment Configuration

Create a `.env` file using `.env.example` structure:

```
PORT=3000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=secure_auth
```

---

## 🗄️ Database Setup

Create database:

```
CREATE DATABASE secure_auth;
```

Create users table:

```
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

---

## ▶️ Running the Application

Install dependencies:

```
npm install
```

Start server:

```
node src/server.js
```

Server runs at:

```
http://localhost:3000
```

---

## 🎯 Learning Outcomes

* Understanding of stateless authentication systems
* Secure password storage using hashing
* Practical JWT implementation
* SQL Injection prevention using parameterized queries
* Structured logging for security monitoring
* SIEM log ingestion workflow
* Version control and secure repository management

---

## 🚀 Future Enhancements

* Brute-force protection (rate limiting)
* Account lockout mechanism
* Role-based access control (RBAC)
* Docker containerization
* Cloud deployment
* Splunk dashboard visualization
