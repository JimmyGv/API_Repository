const app = require('express')();
const process = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const userRouter = require('./routes/User')

const uri = `mongodb+srv://${process.parsed.user}:${process.parsed.password}@cluster0.jjqzrnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(uri,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

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

//console.log(process)
const port = process.parsed.port;

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
