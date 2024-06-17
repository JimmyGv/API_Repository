const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

exports.addVehicleToUser = async (req, res) => {
    const { userId, idVehicle, akaVehicle } = req.body;

    if(!akaVehicle){
        return res.json({
            success: false,
            message: 'Please enter de aka to the vehicle'
        });
    }
    try {
        // Buscar al usuario por su ID
        const user = await UserModel.findById(userId);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'This user does not exist'
            });
        }

        console.log('User found:', user);

        if (!user.vehicles) {
            user.vehicles = [];
        }

        console.log('User vehicles before check:', user.vehicles);

        // Verificar si el vehículo ya está asociado al usuario
        if (user.vehicles.some(vehicle => vehicle.idVehicle === idVehicle)) {
            return res.json({
                success: false,
                message: 'Vehicle already exists'
            });
        }

        console.log('ok')        

        // Si el vehículo no está asociado, añadirlo a la lista de vehículos del usuario
        const newVehicle = { idVehicle, akaVehicle, dateAdded: new Date() };
        user.vehicles.push(newVehicle);
        await user.save();

        return res.json({
            success: true,
            message: 'Vehicle added successfully'
        });
    } catch (error) {
        console.error('Error adding vehicle to user:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in addVehicleToUser module'
        });
    }
};


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
        return res.json({
            success: true,
            message: 'The user was created successfully',
            user
        });
    }catch (error){
        res.send(error);
    }
}   

exports.changesGral = async (req, res) => {
    const { idUser, idVehicle, dateChange, typeChange } = req.body;

    try {
        // Buscar al usuario por su ID
        const user = await UserModel.findById(idUser);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Verificar si el vehículo existe en la lista de vehículos del usuario
        if (!user.vehicles.includes(idVehicle)) {
            return res.json({
                success: false,
                message: 'Vehicle does not exist for this user'
            });
        }

        // Añadir el cambio al vehículo
        user.vehicles.forEach(vehicle => {
            if (vehicle._id.toString() === idVehicle) {
                vehicle.data.push({ typeChange, dateChange });
            }
        });

        // Guardar el usuario actualizado en la base de datos
        await user.save();

        return res.json({
            success: true,
            message: 'Change added successfully'
        });

    } catch (error) {
        console.error('Error adding change to vehicle:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in changesGral module'
        });
    }
};

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

    res.json({success:true, user, token})
    //npm i jsonwebtok
}