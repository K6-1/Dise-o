const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Path to JSON file
const usersFilePath = path.join(__dirname, 'data', 'users.json');

// Endpoint for Signup
app.post('/signup', (req, res) => {
    const { name, email, password, age, gender } = req.body;

    // Validation
    if (!name || !email || !password || !age || !gender) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Read existing users
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Server Error!' });
        }

        let users = [];
        if (data.length > 0) {
            users = JSON.parse(data);
        }

        // Check if user already exists
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered!' });
        }

        // Add new user
        const newUser = { id: Date.now(), name, email, password, age, gender };
        users.push(newUser);

        // Write to file
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving user!' });
            }
            res.status(201).json({ message: 'Signup successful!' });
        });
    });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});