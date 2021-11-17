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

module.exports = { getTests };
