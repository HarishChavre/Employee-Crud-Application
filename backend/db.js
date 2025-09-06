import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "empuser",          
  password: "EmpPass@123",  
  database: "employeedb",   
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error(" Database connection failed:", err.message);
  } else {
    console.log(" Connected to MySQL Database (employeedb)!");
    connection.release();
  }
});

export default db;
