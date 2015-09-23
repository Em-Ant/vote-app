/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Poll = require('../api/poll/poll.model');
var User = require('../api/user/user.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Administrator',
    email: 'admin@admin.com',
    password: process.env.ADMIN_PWD || 'admin',
  }, function() {
      console.log('finished populating users');
    }
  );
});

var John = new User({
    provider: 'local',
    name: 'John',
    email: 'john@test.com',
    password: 'john'
});

John.save(function(err){
  Poll.find({}).remove(function() {
    Poll.create({
      question: 'Is this App a good one ?',
      options: ['Yes', 'No'],
      votes:[5,2],
      popularity: 7,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    }, {
      question: 'Which is you favorite Guitar Hero ?',
      options: ['John Petrucci', 'Steve Vai', 'Michael Angelo Batio'],
      votes:[8,11,6],
      popularity: 25,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    }, {
      question: 'Which is your favorite Pasta Condiment ?',
      options: ['Ragù', 'Pesto', 'Cheese'],
      votes: [7,8,6],
      popularity: 19,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    }, {
      question: 'Are you ready ?',
      options: ['Yep', 'Nope', 'Maybe...'],
      votes: [12,8,6],
      popularity: 26,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    }, {
      question: 'Are you a good Chess Player ?',
      options: ['Yes', 'No'],
      votes:[5,8],
      popularity: 13,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    }, {
      question: 'Which is your favorite Jersey Shore Charachter ?',
      options: ['Snooki', 'Mike The Situation', 'Vinny'],
      votes:[8,11,20],
      popularity: 39,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    }, {
      question: 'Which is your favorite Programming Language ?',
      options: ['JavaScript', 'C++', 'php'],
      votes: [2,3,1],
      popularity: 6,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    }, {
      question: 'Do you think I can do this ?',
      options: ['Sure', 'No Way', 'Keep Calm and...'],
      votes: [12,8,6],
      popularity: 26,
      authorName: John.name,
      authorId: John._id,
      votedBy: [John._id]
    });
  })
});
