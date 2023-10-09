const fs = require('fs');
const path = require('path'); // Import path module for working with file and directory paths

// Middleware: Logger function to log incoming requests
const logger = (req, res, next) => {
    // Writes logs on txt file
    fs.appendFile(path.join(__dirname, 'logs.txt'), `${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl}\n`, err => {
        if (err) throw err;
    });
    next(); // Call the next middleware function in the stack
};

module.exports = logger;
