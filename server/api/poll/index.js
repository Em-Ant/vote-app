'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Recent Custom Route

router.get('/', controller.index);
router.get('/mypolls', auth.isAuthenticated(), controller.readMyPolls);
router.get('/:id/:user', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id/:q', auth.isAuthenticated(), controller.vote);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.delete('/mypoll/:id', auth.isAuthenticated(), controller.destroyMine);


module.exports = router;
