const mongoDB = require('mongoose');

const Manual = new mongoDB.Schema({
    _id:isObjectIdOrHexString(),
    idVehicle:String,
    changeOil: String,
    chageBujia: String,
    changeTire:String,
    changeBatery:String,
    changeBrakes: String,
    changeAirFilter: String,
    changeLiquidBrakes: String,
    tiresAlingAndBalance: String,
    timingBeltReplacement: String,
    chageTransmitionsLiquid:String

  });
  
  module.exports = mongoDB.model('Manual', Manual);