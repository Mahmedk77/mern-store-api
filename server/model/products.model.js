import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter product name'],
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: `{VALUE} is not supported`
        }
    }
})

export const Product = mongoose.model('Product', productSchema)