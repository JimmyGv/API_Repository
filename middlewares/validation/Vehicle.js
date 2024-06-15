const {check, validationResult} =require('express-validator')

exports.validateCreateVehicle=[
    check('name').trim().not().isEmpty().withMessage('Name is required').isLength({min:5, max:50}).
    withMessage("Name must be within 5 to 50 character"),
    check('model').trim().not().isEmpty().withMessage('Model is required').isLength({min:5, max:15}).
    withMessage("Model must be within 5 to 15 character"),
    check('oilChange').trim().not().isEmpty().withMessage('Oil Change is required').isLength({min:100, max:2500}).
    withMessage("Change oil must be within 100 to 2500 character"),
    check('sparkPlugChange').trim().not().isEmpty().withMessage('Spark Plug is required').isLength({min:100, max:2500}).
    withMessage("Change spark plug must be within 100 to 2500 character"),
    check('tyreChange').trim().not().isEmpty().withMessage('Tyre Change is required').isLength({min:100, max:2500}).
    withMessage("Change tyre must be within 100 to 2500 character"),
    check('bateryChange').trim().not().isEmpty().withMessage('Batrery Change is required').isLength({min:100, max:2500}).
    withMessage("Change batery must be within 100 to 2500 character"),
    check('airFilterChange').trim().not().isEmpty().withMessage('Air filter Change is required').isLength({min:100, max:2500}).
    withMessage("Change air filter must be within 100 to 2500 character"),
    check('breakChange').trim().not().isEmpty().withMessage('Break Change is required').isLength({min:100, max:2500}).
    withMessage("Change break must be within 100 to 2500 character"),

]

exports.vehicleValidation = (req, res, next)=>{
    const result = validationResult(req).array();
    //console.log(result);
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({success:false, message: error})
}