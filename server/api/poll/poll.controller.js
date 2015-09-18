'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
require('mongoose-query-paginate');



// Get list of polls - paginted and sorted
exports.index = function(req,res) {
  var sortOrder = '-createdOn';
  if(req.query.order === 'popular' ) sortOrder = '-popularity'
  var query = Poll.find({},'-votedBy').sort(sortOrder);
  var options = {
    perPage: req.query.limit || 4,
    delta: 0,
    page: req.query.page || 1
  }

  query.paginate(options, function (err, results) {
    if(err) { return handleError(res, err) };
    return res.status(200).json(results);
  });
}

// Get a single poll
exports.show = function(req, res) {

  Poll.findById(req.params.id).lean().exec(function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }

    if(req.user) {
      poll.isVotedByCurrentUser = true // (poll.votedBy.indexOf(req.user._id) !== -1)
    }

    delete poll.votedBy;
    return res.json(poll);
  });
};


exports.vote = function(req, res) {
  Poll.findById(req.params.id, function(err, poll){
    if (err) { return handleError(res, err); }
    if (!poll) { return res.status(404).send('Not Found'); }

    // Check if current user has voted this poll before
    if (poll.votedBy.indexOf(req.user._id) === -1) {

      // Not already voted. Save new vote
      poll.popularity++;
      var _votes = poll.votes.slice();
      _votes[req.params.q]++;
      poll.votes = _votes;
      poll.votedBy.push(req.user._id);
      poll.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(poll);
      });
    } else {
      var errObj = {
        alreadyVoted: true,
        data: poll
      };
      return res.status(200).json(errObj);    
    }
  });
}

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
