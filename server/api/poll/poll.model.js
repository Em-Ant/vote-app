'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  options: [String],
  votes: [Number],
  authorId: Schema.Types.ObjectId,
  authorName: String,
  popularity: Number,
  createdOn: {
    type: Date,
    default: Date.now
  },
  votedBy: [Schema.Types.ObjectId]
});


module.exports = mongoose.model('Poll', PollSchema);
