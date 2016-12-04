'use strict';

var express = require('express');
var controller = require('./peer.controller');
var operations = require('./peer.operations');
var authorized = require('../../components/authorize');
var authGuard = require('../../components/authorize/authenticationGuard');

var router = express.Router();

router.get('/', authGuard, controller.index);
router.post('/', authGuard, controller.create);
router.get('/:peer', authGuard, controller.fetch);
router.delete('/:peer', authGuard, controller.delete);
router.post('/:peer/sync', authGuard, operations.createUpdateOperation);

module.exports = router;
