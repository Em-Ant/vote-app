'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
var mongoose = require('mongoose');
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
    if(err) { return handleError(res, err) }
    return res.status(200).json(results);
  });
}

// Get list of polls by Logged In User - paginted and sorted
exports.readMyPolls = function(req,res) {
  var sortOrder = '-createdOn';
  if(req.query.order === 'popular' ) sortOrder = '-popularity'
  var query = Poll.find({authorId: req.user._id},'-votedBy').sort(sortOrder);
  var options = {
    perPage: req.query.limit || 4,
    delta: 0,
    page: req.query.page || 1
  }

  query.paginate(options, function (err, results) {
    if(err) { return handleError(res, err) }
    return res.status(200).json(results);
  });
}

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id).exec(function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found');  }
    var pollObj = poll.toObject();

    if(req.params.user !== '0') {
      var id = req.params.user;
      var isVoted = poll.votedBy.some(function(uid){
        return uid.equals(id);
      });

      if (isVoted) {
        pollObj.isVotedByCurrentUser = true;
      }
    }

    delete pollObj.votedBy;
    return res.status(200).json(pollObj);
  });
};


exports.vote = function(req, res) {
  Poll.findById(req.params.id, function(err, poll){
    if (err) { return handleError(res, err); }
    if (!poll) { return res.status(404).send('Not Found'); }

    if(poll.votedBy.indexOf(req.user._id) === -1) {
      poll.popularity++;
      var _votes = poll.votes.slice();
      _votes[req.params.q]++;
      poll.votes = _votes;
      poll.votedBy.push(req.user._id);
      poll.save(function(err) {
        if (err) { return handleError(res, err); }
        var pollObj = poll.toObject();
        delete pollObj.votedBy;
        return res.status(200).json(pollObj);
      });
    } else {
      return res.status(304);
    }
  });
}

// Creates a new poll in the DB.
exports.create = function(req, res) {

  // Add Author Data
  if (!req.body.authorName) req.body.authorName = req.user.name;
  if (!req.body.authorId) req.body.authorId = req.user._id;

  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};


// Updates an existing pollby the logged in user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    if(req.user._id.equals(poll.authorId)) {
      poll.votes = req.body.votes;
      poll.options = req.body.options;
      poll.save(function (err,p) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(p);
      });
    } else {
      return res.status(304);
    }
  });
};

/**
* The Boilerplate version doesn't work !!!!
*
*
// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.save(function (err,p) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(p);
    });
  });
};
*/

// Deletes a poll by the logged in user from the DB.
exports.destroyMine = function(req, res) {

  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    if( req.user._id.equals(poll.authorId)) {
      poll.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    } else {
      return res.status(304);
    }
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
