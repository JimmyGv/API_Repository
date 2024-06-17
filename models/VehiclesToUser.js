// models/VehicleUser.js
const mongoose = require('mongoose');

const VehicleUserSchema = new mongoose.Schema({
  idVehicle: { type: String, required: true },
  akaVehicle: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  avatar: { type: Buffer },
  dataVehicle: {
    type: [{
      changeName: { type: String },
      dateChange: { type: Date, default: Date.now },
      cost: { type: Number }
    }],
    default: []
  }
});

module.exports = VehicleUserSchema;
