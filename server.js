const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModel")
const multer = require('multer');



const app = express()
app.use(express.json())//TO ACCEPT JSON DATA
app.use(express.urlencoded({extended:false}))//to accept URL encoded form data


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



// //TO SAVE DATA IN DATABASE
// app.post("/product",async(req,res)=>{
//     try{
//         const product = await Product.create(req.body)
//         res.status(200).json(product)
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({message:err.message})
//     }
// })



// //TO SAVE DATA IN DATABASE USING MULTER
//MULTER IS A MIDDLEWARE TO HANDLE FILE UPLOAD IN EXPRESS AND USED FOR MULTIPARTFORM DATA
const upload = multer();
app.post('/product', upload.none(), async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

//TO UPDATE DATA IN DATABASE
app.put("/product/:id",async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id , req.body)
        if(!product){
            res.status(404).json({message:`No such product found with this id ${req.params.id}`})
        }
        const updatedProduct = await Product.findById(req.params.id)
        res.status(200).json(updatedProduct)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})

//TO DELETE DATA FROM DATABASE
app.delete("/product",async(req,res)=>{
    try{
        //const id =  req.params.id 
        const id =  req.body.id 
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:`No such product found with this id ${id}`})
        }
        return res.status(200).json(product)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:err.message})
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