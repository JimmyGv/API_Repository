const UserModel = require('../models/User');


exports.createUser = async(req, res)=>{
    const {name, email, password} = req.body;
    const user = UserModel({
        name,
        email,
        password
    });
    
    const newUser = await user.isThisEmailInUse(email);

    if (!newUser)
        return res.json({
            success: false,
            message: 'This email is alredy in use, try sign-in'
        });

    try{
        await user.save();
        res.send(user);
    }catch (error){
        res.send(error);
    }
}   

exports.userSignIn