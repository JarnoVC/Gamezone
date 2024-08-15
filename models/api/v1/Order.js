const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    title: [{ 
        type: String, 
        ref: 'title', 
        required: true 
    }],
    description: [{ 
        type: String, 
        ref: 'description', 
        required: true 
    }],
    status: { 
        type: String, 
        enum: ['unshipped', 'shipped'], 
        default: 'unshipped' 
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = {
    Order,
};