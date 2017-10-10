const express = require("express");

//setup the express app
const app = express();

//The index route
app.get("/",(req,res)=>{
    res.send("This is the index route");
});

//Run the server
const port = 3000;
app.listen(process.env.port || port,()=>{
    console.log(`The app is running on : ${port}`);
});