'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  pollId: {type: String, required: true},
  option: {type: String, required: true},
});

module.exports = mongoose.model('Vote', voteSchema);
