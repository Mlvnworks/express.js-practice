// Import required modules
const express = require('express'); // Import Express.js framework
const { PORT } = require('./config'); // Import PORT constant from config.js file
const path = require('path'); // Import path module for working with file and directory paths
const logger = require('./logger');
const Product = require('./api/Product');

// Create an instance of Express application
const app = express();
const product = new Product();

// Use the logger middleware for all routes
app.use(logger);

// POST request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoint to get products data
app.get('/api/products', product.getAllProducts);

// API endpoint to get single products data
app.get('/api/products/:id', product.getSingleProduct);

// Create new product
app.post('/api/products', product.createNewProduct);

// Update product item info
app.put('/api/products', product.updateProductItem);

// Delete product item
app.delete('/api/products/:id', product.deleteProductItem);

// Serve static files from the 'public' folder (e.g., index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen on the specified PORT
app.listen(PORT, err => {
    if (err) throw err; // If there is an error while starting the server, throw the error
    console.log(`Server running on ${PORT}`); // Log a message indicating that the server is running on the specified PORT
});
