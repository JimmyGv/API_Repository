const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');


exports.createUser = async(req, res)=>{
    const {name, email, password} = req.body;
    
    const newUser = await UserModel.isThisEmailInUse(email);

    if (!newUser)
        return res.json({
            success: false,
            message: 'This email is alredy in use, try sign-in'
        });

    const user = await UserModel({
        name,
        email,
        password
    });
    try{
        await user.save();
        res.send(user);
    }catch (error){
        res.send(error);
    }
}   

exports.userSignIn = async (req, res) =>{
    const {email, password} = req.body
    const user = await UserModel.findOne({email})

    if(!user) return res.json({success: false, message:"user not found, with the given email"})
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch)
        return res.json({
            success:false,
            message:"the email/password doesn't match"
        });
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
    res.json({success:true,user, token})
    //npm i jsonwebtok
}