const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_mealkit',
    port: 3308,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database');
    }
});



// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM user_mealkit WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: 'Server error while querying database' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send back only the user role upon successful login
        res.json({
            message: 'Login successful',
            role: user.role,
        });
    });
});

// Register route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Check for required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if the email already exists
    const checkEmailQuery = 'SELECT * FROM user_mealkit WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ message: 'Server error while querying database' });
        }

        if (results.length > 0) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Insert new user into the database
        const insertQuery = 'INSERT INTO user_mealkit (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [username, email, password, 'user'], (err, results) => {
            if (err) {
                console.error("Database insertion error:", err);
                return res.status(500).json({ message: 'Server error while registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

app.post('/forgot-reset-password', (req, res) => {
    const { email, username, newPassword } = req.body;

    if (!email || !username || !newPassword) {
        return res.status(400).json({ message: 'Email, username, and new password are required' });
    }

    // Check if the username and email exist in the database
    const query = 'SELECT * FROM user_mealkit WHERE email = ? AND username = ?';
    db.query(query, [email, username], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Server error while querying database' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No account found with the provided username and email.' });
        }

        // Update the password in the database (without hashing)
        const updateQuery = 'UPDATE user_mealkit SET password = ? WHERE email = ? AND username = ?';
        db.query(updateQuery, [newPassword, email, username], (err, updateResults) => {
            if (err) {
                console.error('Database update error:', err);
                return res.status(500).json({ message: 'Server error while updating password' });
            }

            res.json({ message: 'Password updated successfully. You will be redirected to the login page in 5 seconds.' });
        });
    });
});



// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
