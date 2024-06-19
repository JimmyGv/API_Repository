const express = require('express');

const router = express.Router();

const {createUser, userSignIn, addVehicleToUser, changesGral} = require('../controllers/User')
const {validateUserSignUp, validateUserSignIn, userValidation, validateObjectId} = require('../middlewares/validation/User')
const {isAuth} = require('../middlewares/auth')
const multer = require("multer");

const UserModel = require('../models/User')

const storage = multer.memoryStorage()
const sharp = require('sharp');


const fileFilter =(req, file, cb) =>{
  if(file.mimetype.startsWith('image')){
    cb(null, true);
  }
  else{
    cb('invalid image file', false)
  }
}
const uploads = multer({storage, fileFilter})

router.post('/users/add',validateUserSignUp, userValidation, createUser)

router.post('/users/sign-in', validateUserSignIn, userValidation, userSignIn)
router.post('/addVehicleToUser',isAuth,
    validateObjectId('userId'),
    validateObjectId('idVehicle'),
    addVehicleToUser
);

router.post('/vehicles/addChange',isAuth,
    [
        validateObjectId('idUser'),   // Validar que idUser sea un ObjectId válido
        validateObjectId('idVehicle') // Validar que idVehicle sea un ObjectId válido
    ],
    changesGral
);

router.post('/users/upload-profile', isAuth, uploads.single('profile'),async (req, res) =>{
  const {user} = req
  if(!user) return res.status(401).json({success:false,message:"unauthorized access in upload profile"})
    try {
        const profileBuffer=req.file.buffer;
        const {width, height} = await sharp(profileBuffer).metadata()
        const avatar = await sharp(profileBuffer).resize(Math.round(width*0.5),Math.round(height*0.5)).toBuffer()

        await UserModel.findByIdAndUpdate(user._id,{avatar})
        res.status(201).json({success:true, message:"Your profile photo is updated"})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal error server try again in a while"})
        console.log("Error while updating profile image", error.message)
    }

})
//npm install multer
module.exports =router;