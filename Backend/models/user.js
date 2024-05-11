const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Title is requited!'],
    unique: true,
  },
  password: {
    type: String,
    default: 'empty',
    required: [true, 'Description is requited!'],
    minlength: 4,
  },
  name: {
    type: String,
    default: 'String',
    required: [true, 'Description is requited!'],
  },
});

const User = mongoose.model('User', userschema);

module.exports = User;
