import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        city: {
            type: String,
        },
        price: {
            type: Number,
            require: true
        },
        DateEnrolled: {
            type: Date,
            required: true
        },
        DateExpiration: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;