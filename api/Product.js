const products = require('../data');

class Product {
    // API endpoint to get products data
    getAllProducts = (req, res) => {
        res.json(products); // Respond with the products data in JSON format
    };

    // API endpoint to get single products data
    getSingleProduct = (req, res) => {
        const paramId = parseInt(req.params.id);

        // Filter products
        const targetProduct = products.filter(({ id }) => id === paramId);
        if (targetProduct.length > 0) {
            res.json(targetProduct[0]); // Respond with the products data in JSON format
        } else {
            // Response with error code 400 and with error msg
            res.status(400).json({
                msg: `No product with id of ${paramId}`,
            });
        }
    };

    // Create new product
    createNewProduct = (req, res) => {
        const autoIncrementId =
            products
                .map(({ id }) => id)
                .sort((a, b) => a - b)
                .reverse()[0] + 1;

        try {
            // Extract needed datas
            const { name, price, description, category } = req.body;

            // Check if all properties have exist
            if (!name || !price || !description || !category) {
                res.status(400).json({
                    msg: 'Please include name, price, description and category',
                });
                return;
            }
            // Create new product object
            const newProduct = {
                id: autoIncrementId,
                name,
                price,
                description,
                category,
            };

            // Add the new product to `product array`
            products.push(newProduct);

            res.json(products);
        } catch (err) {
            res.status(400).json({
                msg: err.getMessage(),
            });
        }
    };
}

module.exports = Product;
