'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  options: [String],
  votes: [Number],
  authorId: Schema.Types.ObjectId,
  authorName: String,
  popularity: {
    type: Number,
    default: 0
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  votedBy: [Schema.Types.ObjectId]
}, {
    versionKey: false
});


module.exports = mongoose.model('Poll', PollSchema);
