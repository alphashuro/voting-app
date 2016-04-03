'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: {type: String, required: true},
  options: {type: Array, required: true},
  userId: {type: String, required: true},
});

module.exports = mongoose.model('Poll', pollSchema);
