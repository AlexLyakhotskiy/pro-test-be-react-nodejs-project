const { serializeTests } = require('./test.serializer');
const { getRandomInt } = require('../helpers/randomTest');
const Test = require('./test.model');

async function getTests(req, res, next) {
  const { nameTest } = req.params;

  const results = await Test.find({ nameTest });

  const testsQuantity = 12;
  const newTest = [];
  for (let i = 0; i < testsQuantity; i++) {
    const index = getRandomInt(results.length);
    const oneTest = results.splice(index, 1);
    newTest.push(...oneTest);
  }

  res.status(200).send(serializeTests(newTest));
}

async function getResult(req, res, next) {
  const { nameTest } = req.params;
  const userAnswers = req.body;

  const test = await Test.find({ nameTest });

  let correctAnswers = 0;
  userAnswers.forEach(userItem => {
    const question = test.find(item => item.question === userItem.question);
    if (userItem.rightAnswer === question.rightAnswer) {
      correctAnswers += 1;
    }
  });

  res.status(200).send({ correctAnswers });
}

module.exports = { getTests, getResult };
