const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModel")


const app = express()
//TO ACCEPT JSON DATA
app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("Hello this is server")
// })
// app.get("/blog",(req,res)=>{
//     res.send("Hello this is blog")
// })

//TO GET ALL DATA FROM DATABASE
app.get("/product",async(req,res)=>{
    try{
    const product = await Product.find({})
    res.status(200).json(product)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})
//TO GET SINGLE DATA FROM DATABASE
app.get("/product/:id",async(req,res)=>{
    try{
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})
//TO SAVE DATA IN DATABASE
app.post("/product",async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})


//TO CONNECT WITH MONGODB
mongoose.set('strictQuery', false);//to avoid warning
mongoose.connect('mongodb://127.0.0.1:27017/NodeRestApi')
    .then(() => {
        console.log('Connection to MongoDB successful');
        app.listen(3000 , ()=>{
            console.log("Hello this is console")
        })
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });