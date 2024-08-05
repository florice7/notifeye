const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();
const port = 3000;

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Musafiri7@7Florice',
    database: 'employeedb1'
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join('C:/Users/Florice/Desktop/NOTIFEYE'))); // Serving static files from NOTIFEYE folder

// Serve the HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/Florice/Desktop/NOTIFEYE', 'admin-dashboard.html'));
});

// Fetch all employees
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Fetch a single employee
app.get('/employees/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM employees WHERE pf_number = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    });
});


// Add a new employee
app.post('/employees', (req, res) => {
    const { pf_number, first_name, last_name, gender, date_of_birth, email, phone_number, preferred_notification_method, department } = req.body;
    const sql = 'INSERT INTO employees (pf_number, first_name, last_name, gender, date_of_birth, email, phone_number, preferred_notification_method, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [pf_number, first_name, last_name, gender, date_of_birth, email, phone_number, preferred_notification_method, department], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee added successfully', id: result.insertId });
    });
});

// Update an employee
app.put('/employees/:id', (req, res) => {
    const id = req.params.id;
    const { first_name, last_name, gender, date_of_birth, email, phone_number, preferred_notification_method, department } = req.body;
    const sql = 'UPDATE employees SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, email = ?, phone_number = ?, preferred_notification_method = ?, department = ? WHERE pf_number = ?';
    db.query(sql, [first_name, last_name, gender, date_of_birth, email, phone_number, preferred_notification_method, department, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee updated successfully' });
    });
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM employees WHERE pf_number = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee deleted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
