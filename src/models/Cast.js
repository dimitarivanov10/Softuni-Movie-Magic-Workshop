import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name:{
        type: String,
        required: [true, "Cast name is required!"]
    },
    age:{
        type: Number,
        required: [true, "Cast age is required!"],
        max: 120,
        min: 0
    },
    born:{
        type: String,
        required: [true, "Cast born place is required!"]
    },
    imageUrl:{
        type: String,
        required: [true, "Cast image is required!"]
    }
})

const Cast = model("Cast", castSchema);

export default Cast;