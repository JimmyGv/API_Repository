const express = require('express');
const router = express.Router();
const multer = require("multer");

const {createVehicle} = require('../controllers/Vehicle')
const {validateCreateVehicle, vehicleValidation} = require('../middlewares/validation/Vehicle')

const VehicleModel = require('../models/Vehicle')
const {isAuth} = require('../middlewares/auth')

const storage = multer.memoryStorage()
const sharp = require('sharp');

const fileFilterVehicle =(req, file, cb) =>{
    if(file.mimetype.startsWith('image')){
      cb(null, true);
    }
    else{
      cb('invalid image file', false)
    }
  }

  const updateImgVehicle = multer({storage, fileFilterVehicle})

  router.post('/vehicle/add',validateCreateVehicle,vehicleValidation,createVehicle)
  router.post('/vehicle/update-image', isAuth, updateImgVehicle.single('imageVeh'), async (req, res) =>{
    const {user} =req
    if(!user) return res.status(401).json({success:false,message:"unauthorized access"})
        try{
            const imgbuffer = req.file.buffer;
            const {width, height} = await sharp(imgbuffer).metadata()
            const avatar = await sharp(imgbuffer).resize(Math.round(width*0.5),Math.round(height*0.5)).toBuffer()
            await VehicleModel.findByIdAndUpdate(req.body._id, {avatar})
            res.status(201).json({success:true, message:"The vehicle photo is updated"})
        }catch(error){
            res.status(500).json({success:false, message:"Failed to update the vehicle photo try in a while"})
            console.log("Error while updating the pic", error.message)
        }
  })

  module.exports = router;