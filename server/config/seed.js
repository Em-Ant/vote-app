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
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
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
      authorName: John.name,
      authorId: John._id,
    }, {
      question: 'Which is you favorite Guitar Hero ?',
      options: ['John Petrucci', 'Steve Vai', 'Michael Angelo Batio'],
      votes:[8,11,6],
      authorName: John.name,
      authorId: John._id,    
    }, {
      question: 'Which is your favorite Pasta Condiment ?',
      options: ['Ragù', 'Pesto', 'Cheese'],
      votes:[7,8,6],
      authorName: John.name,
      authorId: John._id,    
    });
  })
});
