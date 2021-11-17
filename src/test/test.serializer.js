/** @format */

function serializeTest(test) {
  return {
    id: test._id,
    question: test.question,
    nameTest: test.nameTest,
    answers: test.answers,
    rightAnswer: "",
  };
}

exports.serializeTests = function serializeTests(test) {
  return test.map(serializeTest);
};
