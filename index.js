const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const routes = require("./routes/api");

//setup the express app
const app = express();

//connect to mongoDb
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/vidjot-dev",{
    useMongoClient : true
})
.then(()=>{
    console.log("MongoDb connected");
})
.catch(err => console.log(err));

//body-parser middleware
app.use(bodyParser.json());

//initialize routes
app.use("/api" , routes);

//Error Handling middleware
app.use((err,req,res,next)=>{
   res.status(422).send(err.message);
});

//Run the server
const port = 4000;
app.listen(process.env.port || port,()=>{
    console.log(`The app is running on : ${port}`);
});