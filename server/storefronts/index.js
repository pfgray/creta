'use strict';

var express = require('express');
var controller = require('./storefronts.controller');

var router = express.Router();

router.post('/:storefront/lti', controller.lti);
router.get('/:storefront/config.xml', controller.appStoreConfig);
router.get('/:storefront/launches', controller.totalLaunches);

//todo: how to only enable this in 'dev' mode?
router.get('/:storefront/ltidev', controller.ltidev);

module.exports = router;
