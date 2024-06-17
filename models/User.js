const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');
const VehicleUserSchema = require('../models/VehiclesToUser')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar: Buffer,
    vehicles: {
        type: [{VehicleUserSchema}],
        default:[]
      }
})

UserSchema.pre('save', function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash)=>{
            if(err) return next(err);

            this.password= hash;
            next();
        })
    }

})

UserSchema.methods.comparePassword = async function (password){
    if(!password) throw new Error('Password is mission, can not compare')

    try{
        const result = await bcrypt.compare(password,this.password);
        return result;
    }catch(error){
        console.log("Error while comparing password", error.message)
    }
}

UserSchema.statics.isThisEmailInUse = async function(email){
    if(!email) throw new Error('invalid email')
    try{
        const user = await this.findOne({email})
        if(user) return false

        return true;
    }catch(error){
        console.log('Error inside emailUse method', error.message)
    }
}

const UserModel = mongoose.model('User',UserSchema);

module.exports = UserModel;