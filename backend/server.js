import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ensure table exists (matches your current schema)
db.query(`
  CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(50),
    department VARCHAR(100),
    designation VARCHAR(100),
    salary DECIMAL(10,2)
  )
`, (err) => {
  if (err) console.log("Table creation error:", err);
  else console.log(" Employees table ready");
});

//  Get all employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

//  Add employee
app.post("/employees", (req, res) => {
  const { name, email, phone, department, designation, salary } = req.body;
  db.query(
    "INSERT INTO employees (name, email, phone, department, designation, salary) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, phone, department, designation, salary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, ...req.body });
    }
  );
});


app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Employee deleted" });
  });
});


app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone, department, designation, salary } = req.body;
  db.query(
    "UPDATE employees SET name=?, email=?, phone=?, department=?, designation=?, salary=? WHERE id=?",
    [name, email, phone, department, designation, salary, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Employee updated" });
    }
  );
});

app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
