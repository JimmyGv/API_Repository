const {check, validationResult} =require('express-validator')

exports.validateUserSignUp = [
    check('name').trim().not().isEmpty().withMessage('Name is required').isString().withMessage('Must be a valid name').isLength({min:10,  max:100}).
    withMessage('Name must be within 10 to 100 character'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    check('password').trim().not().isEmpty().withMessage('Password is empty').isLength({min:8, max:20}).
    withMessage('Paswword must be within 8 to 20 character'),
    check('confirmPassword').trim().not().isEmpty().custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('Both password must be the same')

        }
        return true
    })
]

exports.userValidation = (req, res, next)=>{
    const result = validationResult(req).array();
    //console.log(result);
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({success:false, message: error})
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('email/ password required'),
    check('password').trim().not().isEmpty().withMessage('email/passsword required')

]