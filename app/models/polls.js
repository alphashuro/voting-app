'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  title: String,
  options: Array,
  userId: String,
});

module.exports = mongoose.model('Poll', Poll);
