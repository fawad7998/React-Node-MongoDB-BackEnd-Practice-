const Note = require('./../models/nodeModel');

exports.getNotes = async (req, res) => {
  try {
    const note = await Note.find({});
    res.status(200).json({
      status: 'success',
      length: note.length,
      data: note,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.CreateNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);

    res.status(201).json({
      status: 'success',
      note: newNote,
    });
  } catch (error) {
    // console.log(error);
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
exports.updateNote = async (req, res) => {
  try {
    const newNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'success',
      note: newNote,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'sucess',
      message: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getOneNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      length: note.length,
      data: note,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
