/** @format */
const { getRandomInt } = require("../helpers/randomTest");
const Test = require("./test.model");

async function getTests(req) {
  const results = await Test.find(req);
  const testsQuantity = 12;
  const newTest = [];
  for (let i = 0; i < testsQuantity; i++) {
    const index = getRandomInt(results.length);
    const oneTest = results.splice(index, 1);
    newTest.push(...oneTest);
  }
  return newTest;
}

async function getResult(nameTest, userAnswers) {
  const test = await Test.find({ nameTest });
  let correctAnswers = 0;
  userAnswers.forEach((userItem) => {
    const question = test.find((item) => item.question === userItem.question);
    if (userItem.rightAnswer === question.rightAnswer) {
      correctAnswers += 1;
    }
  });
  return { correctAnswers };
}

module.exports = { getTests, getResult };
