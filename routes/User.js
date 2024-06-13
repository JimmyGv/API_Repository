const express = require('express');

const router = express.Router();

const {createUser} = require('../controllers/User')
const {validateUserSignUp, validateUserSignIn, userValidation, userSignIn} = require('../middelwares/validation/User')

router.post('/users/add',validateUserSignUp, userValidation, createUser)

router.post('/users/sign-in', validateUserSignIn, userValidation, userSignIn)

module.exports =router;