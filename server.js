const express = require('express');
const bodyParser = require('body-parser');
const constant = require('./config/keys'); // Load your config file (which includes PORT, MONGO_URI, etc.)

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || constant.PORT || 4000; // setting port
const env = process.env.NODE_ENV || 'development'; //setting environment

require('./db/DB'); // for database connection

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// version 1
app.use('/api/v1/users',require('./v1/routes/user'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port} with ${env} environment`);
});



