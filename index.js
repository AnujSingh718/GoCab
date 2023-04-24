const express = require('express');
const  bodyParser = require('body-parser');
const mongoose = require('mongoose');


//connect to mongoDB
mongoose.connect('mongodb://127.0.0.1/gocab');
mongoose.Promise = global.Promise;
//set up express app
const app = express();

app.use(express.static('./public')); 


app.use(bodyParser.json());
//initialize routes
app.use('/api',require('./routes/api'));


//error handeling middleware
app.use((err,req,res,next)=>{
     res.status(422).send({error:err.message});
})

//listening to request
app.listen(4000, ()=>{
    console.log('listening on port 4000');
});