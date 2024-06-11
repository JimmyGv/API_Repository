const mongoDB = require('mongoose');

const Request = new mongoDB.Schema({
    name: String,
    mail: String,
    password:String,
    dateRequest: { type: Date, default: Date.now }
  });
  
  module.exports = mongoDB.model('Request', Request);