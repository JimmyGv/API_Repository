const express = require('express');

const router = express.Router();

const {createUser} = require('../controllers/User')
const {validateUserSignUp, userValidation} = require('../middelwares/validation/User')

router.post('/users/add',validateUserSignUp, userValidation, createUser)

router.post('/users/sign-in', req, res)

module.exports =router;