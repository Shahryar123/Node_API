const express = require("express")

const app = express()


app.get("/",(req,res)=>{
    res.send("Hello this is server")
})
app.listen(3000 , ()=>{
    console.log("Hello this is console")
})