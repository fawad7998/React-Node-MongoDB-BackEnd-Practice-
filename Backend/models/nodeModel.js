const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is requited!'],
  },
  description: {
    type: String,
    default: 'empty',
    required: [true, 'Description is requited!'],
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
