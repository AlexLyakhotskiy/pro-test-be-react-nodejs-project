/** @format */

const express = require("express");
const router = express.Router();

const { authorize } = require("../auth/authorize.middleware");
const Test = require("./test.model");

router.get("/:nameTest", authorize, async (req, res, next) => {
  try {
    const results = await Test.find({ nameTest: req.params.nameTest });
    res.json({
      status: "success",
      code: 200,
      data: {
        tests: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/", authorize, async (req, res, next) => {
  const { question, answers, nameTest, rightAnswer } = req.body;
  try {
    const result = await Test.create({
      question,
      answers,
      nameTest,
      rightAnswer,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { test: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
