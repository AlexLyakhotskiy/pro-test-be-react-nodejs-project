const express = require('express');
const router = express.Router();

const { authorize } = require('../auth/authorize.middleware');
const { getTests, getResult } = require('./test.controller');
const { serializeTests } = require('./test.serializer');

router.get('/:nameTest', authorize, async (req, res, next) => {
  try {
    const tests = await getTests({ nameTest: req.params.nameTest });
    return res.status(200).send(serializeTests(tests));
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:nameTest/results', authorize, async (req, res, next) => {
  try {
    const correctAnswers = await getResult(req.params.nameTest, req.body);
    res.status(200).send(correctAnswers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
