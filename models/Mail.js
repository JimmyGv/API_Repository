const mongoDB = require('mongoose');

const mailSchema = new mongoDB.Schema({
  recipient: String,
  subject: String,
  body: String,
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoDB.model('Mail', mailSchema);