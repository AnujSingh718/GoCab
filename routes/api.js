const express = require('express');
const router = express.Router();
const Driver = require('../models/driver');


//get list of drivers from database
router.get('/drivers',(req,res,next)=>{
    //  Driver.find({}).then(driver=>{
    //     res.send(drivers);
    //  });
    Driver.aggregate().near({
       near: {
            type:'Point',
        'coordinates':[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
        maxDistance:100000,spherical:true,distanceField:"dis"}
    ).then((driver)=>{
      res.send(driver);
    });
});
 
//add new driver to database
router.post('/drivers',(req,res,next)=>{
  Driver.create(req.body).then((driver)=>{
    res.send(driver);
  }).catch(next);
});

//update a driver in database
router.put('/drivers/:id',(req,res,next)=>{
    Driver.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        Driver.findOne({_id:req.params.id}).then((driver)=>{

        res.send(driver);
    })

    });
    
});

//delete a  drivers from database
router.delete('/drivers/:id',(req,res,next)=>{
    Driver.findByIdAndRemove({_id:req.params.id}).then((driver)=>{
        res.send(driver);
    });
}); 

module.exports = router;