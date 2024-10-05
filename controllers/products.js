const Product = require('../models/product')


const getAllProducts = async (req, res) => {
    try {
        const { company, name, sortByPrice } = req.query;
        const queryObject = {};
        
        if (company) {
            queryObject.company = { $regex: `^${company}`, $options: 'i' };  
        }

        if (name) {
            queryObject.name = { $regex: `^${name}`, $options: 'i' }; 
        }

        console.log(queryObject); 

        let products;
        if (sortByPrice) {
            products = await Product.find(queryObject).sort({ price: sortByPrice === 'asc' ? 1 : -1 });
        } else {
            products = await Product.find(queryObject);
        }
        
        res.status(200).json({ products, nbHits: products.length });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getProduct = async(req, res) => {
    try {
        const {id: productID} = req.params
        const product = await Product.findOne({_id: productID})
        if(!product) {
            return res.status(404).json({msg: "Not found"})
        }
        return res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


const createProduct = (req, res) => { 
    try {
        createdProduct = new Product(req.body)
        createdProduct.save()
        return res.status(200).json({msg:"DONE"})
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

const updateProduct = async (req, res) => { 
    try {
        const {id: productID} = req.params
        const product = req.body
        const updatedProduct = await Product.findOneAndUpdate({_id: productID}, product, {
            new:true,
            runValidators:true,
        })
        if(!updatedProduct) {
            return res.status(404).json({msg: "Not found"})
        }
        return res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteProduct = async(req, res) => { 
    try {
        const {id: productID} = req.params
        const deletedProduct = await Product.findOneAndDelete({_id: productID})
        if(!deletedProduct) {
            return res.status(404).json({msg: "Not found"})
        }
        return res.status(200).json({msg: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({ msg: error })
    }

}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,

}