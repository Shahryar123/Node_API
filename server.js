const express = require("express")
const mongoose = require("mongoose")

const app = express()


app.get("/",(req,res)=>{
    res.send("Hello this is server")
})
app.get("/blog",(req,res)=>{
    res.send("Hello this is blog")
})

mongoose.set('strictQuery', false);
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