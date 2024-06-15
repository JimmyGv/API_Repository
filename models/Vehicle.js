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
    oilChange:{
        type:String,
        required:true
    },
    sparkPlugChange:{
        type:String,
        required:true
    },
    airFilterChange:{
        type:String,
        required:true
    },
    tyreChange:{
        type:String,
        required:true
    },
    bateryChange:{
        type:String,
        required:true
    },
    breakChange:{
        type:String,
        required:true
    },
    avatar: Buffer
})

VehicleSchema.statics.isThisVehicleExist = async function(name, model){
    if(!name) throw new Error('Invalid name')
    try{
        const vehicle = await this.findOne({name, model})
        if(vehicle){
            return false
        }
        return true
    }catch(error){
        console.log("Error inside vehicleExist method ",error.message)
    }
}
const VehicleModel = mongoose.model('Vehicle', VehicleSchema);

module.exports =  VehicleModel;