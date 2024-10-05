const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Product name must be provided']
    },
    
    category: {
        type:String,
        required: [true, 'Product category must be provided']
    },

    company: {
        type:String,
        required: [true, 'Product company must be provided']
    },
    
    price: {
        type:Number,
        required: [true, 'Product price must be provided']
    },
    
})


module.exports = mongoose.model('Product', productSchema)