const app = require('express')();
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const userRouter = require('./routes/User');


mongoose.connect(process.env.MONGO_URI,{
    
}).then(()=>{
    console.log("The db is connected")
}).catch(error=> console.log(error.message))


app.use(express.json());
app.use(userRouter);

const test = async (email, password) => {
    const user =  await UserModel.findOne({email, password});
    const result = await user.comparePassword(password)
    console.log(result);
}


const db = mongoose.connection;

db.once("open",()=>{
    console.log('Connection Successfull')
})


app.get('/users',async(req, res)=>{
    const data = await UserModel.find();
    try{
        res.send(data);
    }
    catch{
        res.send(error);
    }
})

app.get('/', (req, res) => {
    res.send('Connecting to DB');
});

app.listen(3000,()=>{
    console.log("listening on port 3000")
})
