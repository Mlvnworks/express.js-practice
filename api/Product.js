let products = require('../data');

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

    // Update an item product
    updateProductItem = (req, res) => {
        // Extract query body
        const { id, name, description, price, category } = req.body;

        // check if product is exist
        if (products.filter(productItem => parseInt(productItem.id) === parseInt(id)).length <= 0) return res.status(400).json({ msg: `Product with id of ${id} does not exists.` });

        // Check if all properties are present
        if (id && name && description && price && category) {
            try {
                products = products.map(productItem => {
                    if (productItem.id === parseInt(id)) {
                        return {
                            id,
                            name,
                            description,
                            price,
                            category,
                        };
                    } else {
                        return productItem;
                    }
                });

                res.json(products);
            } catch (err) {
                res.status(400).json({
                    msg: err.getMessage(),
                });
            }
        } else {
            res.status(400).json({
                msg: `Invalid request required body : id, name, description, price, and category.`,
            });
        }
    };

    deleteProductItem = (req, res) => {
        const targetId = req.params.id;

        // Check if `targetId` is existed
        if (products.filter(({ id }) => parseInt(id) === parseInt(targetId)).length <= 0) return res.status(400).json({ msg: `Product with id of ${targetId} does not exists.` });

        try {
            products = products.filter(({ id }) => parseInt(id) !== parseInt(targetId));

            res.json(products);
        } catch (err) {
            res.status(500).json({ msg: 'Failed to delete product' });
        }
    };
}

module.exports = Product;
