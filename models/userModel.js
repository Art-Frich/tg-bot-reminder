const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  tgId: {
    default: '',
    type: String,
    unique: true,
  },
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
