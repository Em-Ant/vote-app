'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
  }
});

PollSchema.statics = {
  getRecent: function(num, olderThan, cb) {
    this.find({createdOn: {$lt : olderThan || Date.now()}})
    .sort('-createdOn')
    .limit(num || 3)
    .exec(cb);
  },
  
  getPopular: function(cb) {
    this.find()
    .sort('-popularity')
    .exec(cb);
  }
}

module.exports = mongoose.model('Poll', PollSchema);
