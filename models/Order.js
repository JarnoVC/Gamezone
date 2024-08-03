const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    }],
    status: { 
        type: String, 
        enum: ['unshipped', 'shipped'], 
        default: 'unshipped' 
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;