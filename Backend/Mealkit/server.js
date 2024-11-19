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


// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
