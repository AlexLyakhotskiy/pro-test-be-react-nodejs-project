/** @format */

const express = require('express');
const router = express.Router();

const { authorize } = require('../auth/authorize.middleware');
const { getTests } = require('./test.controller');
const { serializeTests } = require('./test.serializer');
// const Test = require("./test.model");

router.get('/:nameTest', authorize, async (req, res, next) => {
  try {
    const tests = await getTests({ nameTest: req.params.nameTest });
    return res.status(200).send(serializeTests(tests));
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
