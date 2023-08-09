import mongoose from "mongoose";

const coachSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        address: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true
    }
);


const Coach = mongoose.model('Coach', coachSchema)

export default Coach;

