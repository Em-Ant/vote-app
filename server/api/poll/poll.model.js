'use strict';

var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var PollSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortid.generate
  },
  question: String,
  options: [String],
  votes: [Number],
  authorId: {
    type: Schema.Types.ObjectId,
    index: true
  },
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
