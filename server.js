const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

const correctPassword = 'madhu123';

//app.get('/', (req, res) => {
   // res.send('Server is running'); // You can replace this with the content you want to serve
 //});
 

// Route for the root path
app.get('/', (req, res) => {
    console.log('Received GET request at /');
    res.sendFile(__dirname + '/index.html'); // Replace 'index.html' with your desired home page
});

app.get('/external.css', (req, res) => {
    res.sendFile(__dirname + '/external.css');
})

app.use((req, res, next) => {
    console.log(`Requested: ${req.method} ${req.url}`);
    next();
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
