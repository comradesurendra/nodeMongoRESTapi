const express = require("express");
const router = express.Router();

const Ninja = require("./../models/ninja");


//get a list of ninjas from the database
router.get("/ninjas",(req , res)=>{
//    Ninja.find({})
//    .then((ninjas)=>{
//         res.send(ninjas);
//    })
    Ninja.geoNear(
        {
            type : "Point",
            coordinates : [parseFloat(req.query.lng),parseFloat(req.query.lat)]
        },
        {
            maxDistance : 100000,
            spherical : true
        }
    ).then((ninjas)=>{
        res.send(ninjas);
    });
});

//Add a new ninja to the database
router.post("/ninjas",(req , res ,next)=>{
  Ninja.create(req.body)
  .then((ninja)=>{
    res.send(ninja);
  })
  .catch(next);
});

//Update a ninja in the database
router.put("/ninjas/:id",(req , res)=>{
    Ninja.findByIdAndUpdate({
        _id : req.params.id
    },req.body)
    .then(()=>{
        Ninja.findOne({
            _id : req.params.id
        }).then((ninja)=>{
            res.send(ninja);
        })
    })
});

//Delete a ninja from the database
router.delete("/ninjas/:id",(req , res)=>{
    Ninja.findByIdAndRemove({
        _id : req.params.id
    }).then((ninja)=>{
        res.send(ninja);
    });
});

module.exports = router;