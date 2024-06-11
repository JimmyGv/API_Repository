const mongoDB = require('mongoose');

const Vehicle = new mongoDB.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    mark: { type: String, required: true },
    description: { type: String, required: true }
  });
  
  module.exports = mongoDB.model('Vehicle', Vehicle);