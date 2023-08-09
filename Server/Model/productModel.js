import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User',
    },
    name: {
        type: String,

    },
    MainName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        default: 0
    },
    color: {
        type: Array,

    },
    size: {
        type: Array,

    },
    image: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true,
    },
    sizeChart: {
        type: Object,
        require: true,
    },
    countInStock: {
        type: Number,
        require: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        require: true,
        default: 0,
    },
    catagory: {
        type: String,
        require: true
    },


},
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema);

export default Product