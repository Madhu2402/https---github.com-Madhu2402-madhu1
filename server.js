const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const correctPassword = 'madhu123';

// Route for the root path
app.post('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Replace 'index.html' with your desired home page
});

app.post('/login', (req, res) => {
    const enteredPassword = req.body.password;

    if (enteredPassword === correctPassword) {
        res.sendFile(path.join(__dirname, 'protected.html'));
    } else {
        // Send an error response
        res.status(401).send('Wrong password. Please try again.');
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log('Server started at port: ' + PORT);
    }
});
