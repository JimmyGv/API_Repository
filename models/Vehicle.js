const mongoose = require('mongoose');
const { type } = require('os');

const VehicleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    avatar:{
        type:Buffer,
        required:true
    }
})

const VehicleModel = mongoose.model('User', VehicleSchema);

module.exports =  VehicleModel;