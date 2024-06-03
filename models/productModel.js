const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"]
    },
    image:{
        type: String,
        required: false
    }   
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Product", productSchema)
