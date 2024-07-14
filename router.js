const express = require('express');
const bodyParser = require('body-parser');
const dt = require('./database.js');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'Assets' directory
app.use(express.static(path.join(__dirname, 'Assets')));

// Route to serve the Gym.html file
app.get('/', (req, res) => {
    loadPage('Gym.html', res);
})

// Route to serve the register.html file
app.get('/joinnow', (req, res) => {
    loadPage('joinnow.html', res);
});

// Route to serve the login.html file
app.get('/admin', (req, res) => {
    loadPage('admin.html', res);
});

// Route to serve the home.html file
app.get('/dashboard', (req, res) => {
    loadPage('dashboard.html', res);
});

// Route to handle form submission for registration
app.post('/joinnow', async (req, res) => {
    const { fullName, Aadhaarcard, email, phoneNumber, weight, options, gender } = req.body;

    const passdata = JSON.stringify({
        fullName,
        Aadhaarcard,
        email,
        phoneNumber,
        weight,
        options,
        gender
    });

    // Replace dt.insertlocal with your actual database function
    const status = await dt.insertlocal(fullName, Aadhaarcard, email, phoneNumber, weight, options, gender, passdata);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <h1>Registration successful!</h1>
        Full Name: ${fullName}<br>
        Aadhaarcard Number: ${Aadhaarcard}<br>
        Email: ${email}<br>
        Phone Number: ${phoneNumber}<br>
        Weight: ${weight}<br>
        Plan: ${options}<br>
        Gender: ${gender}<br>
        Status: ${status}
    `);
});

// Route to handle form submission for login
app.post('/admin', async (req, res) => {
    const { admin, admin123 } = req.body;
    const isValid = await dt.validateLogin(admin, admin123);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (isValid) {
        res.end(`
            <html>
            <head>
                <script type="text/javascript">
                    alert('Login successful! Welcome back, ${admin}');
                    window.location.href = '/dashboard';
                </script>
            </head>
            <body></body>
            </html>
        `);
    } else {
        res.end(`
            <html>
            <head>
                <script type="text/javascript">
                    alert('Login failed. Invalid username or password');
                    window.location.href = '/admin';
                </script>
            </head>
            <body></body>
            </html>
        `);
    }
});

// get data from db
app.get('/dashboard', async (req, res) => {
    try {
        const registrations = await Registration.find({});
        res.render('dashboard', { registrations });
    } catch (error) {
        res.status(500).send("Error retrieving registration data: " + error.message);
    }
});



// Function to load HTML page
function loadPage(url, res) {
    fs.readFile(path.join(__dirname, 'Assets', url), (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
