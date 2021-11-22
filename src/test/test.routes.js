const express = require('express');
const router = express.Router();

const { authorize } = require('../auth/authorize.middleware');
const { getTests, getResult } = require('./test.controller');

const { controllerWrapper } = require('../helpers/controllerWrapper');

router.get('/:nameTest', authorize, controllerWrapper(getTests));

router.post('/:nameTest/results', authorize, controllerWrapper(getResult));

module.exports = router;
