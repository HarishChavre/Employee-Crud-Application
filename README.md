# Employee Management System

A basic employee management system using **React.js** (frontend) and **Node.js + Express + MySQL/MariaDB** (backend).  
You can add, view, edit, and delete employees.

---

## Project Structure

EMP/
├── backend/ # Node.js + Express + MySQL
└── frontend/ # React.js


---

## Setup

### Database
```sql
CREATE DATABASE employeedb;
USE employeedb;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(50),
  department VARCHAR(100),
  designation VARCHAR(100),
  salary DECIMAL(10,2)
);

Backend

cd backend
npm install
node server.js

Frontend

cd frontend
npm install
npm start
