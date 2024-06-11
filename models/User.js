const mongoDB = require('mongoose');

const User = new mongoDB.Schema({
    name: String,
    mail: String,
    password: String,
    vehicles:[
        {
            idVehicle: String,
            akaVehicle:String,
            dateAdded: { type: Date, default: Date.now }
        }
    ]
  });
  
  module.exports = mongoDB.model('User', User);