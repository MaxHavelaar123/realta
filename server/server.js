const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import cors

const app = express();
const port = 3001; // Port for the API server

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahasiswa'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3004' // Replace with your frontend URL
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
    db.execute(query, [username, password], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed' });
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a token (you can customize the payload and secret)
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
