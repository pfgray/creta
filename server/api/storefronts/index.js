'use strict';

var express = require('express');
var controller = require('./storefront.controller');
var authorized = require('../../components/authorize');
var authGuard = require('../../components/authorize/authenticationGuard');

var router = express.Router();

var ltiStorefrontController = require('../../storefronts/storefronts.controller');

router.get('/', authGuard, controller.index);
router.post('/', authGuard, controller.create);
router.get('/:storefront', authGuard, controller.fetch);
router.delete('/:storefront', authGuard, controller.delete);
router.get('/:storefront/appStore', ltiStorefrontController.appStore);

module.exports = router;
