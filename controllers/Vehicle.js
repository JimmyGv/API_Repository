const VehicleModel = require('../models/Vehicle');

exports.createVehicle = async(req, res)=>{
    const{name, model,oilChange,airFilterChange,sparkPlugChange,tyreChange,bateryChange,breakChange} = req.body;

    const newVehicle = await VehicleModel.isThisVehicleExist(name, model);

    if(!newVehicle){
        return res.json({
            success: false,
            message: 'Vehicle already exist'
        })
    }

    const vehicle = await VehicleModel({
        name,
        model,
        oilChange,
        sparkPlugChange,
        airFilterChange,
        tyreChange,
        bateryChange,
        breakChange
    });

    try{
        await vehicle.save();
        res.json({
            success: true,
            message: 'Vehicle created successfully',
            vehicle
            })
    }catch(error){
        res.json({
            success: false,
            message: 'Error creating vehicle',
            error
        })
    }
}