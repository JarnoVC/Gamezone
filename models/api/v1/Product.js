const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { 
        type: String, 
        required: false 
    },
    description: { 
        type: String, 
        required: false 
    },
    price: { 
        type: Number, 
        required: false 
    },
    image: { 
        type: String 
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = {
    Product,
};