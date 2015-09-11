'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  options: [String],
  votes: [Number],
  authorId: Schema.Types.ObjectId,
  authorName: String,
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Poll', PollSchema);
