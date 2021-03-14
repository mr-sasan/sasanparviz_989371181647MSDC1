const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Test = require("../Models/Test");
const JWTMiddleware = require("../src/middlewares/jwt");
const UserAnswers = require("../Models/UserAnswers");

router.get("/", JWTMiddleware, async (req, res) => {
  const testData = await Test.findById(req.user.testId).populate("questions");

  if (Date.now() < testData.startTimestamp) {
    res.status(200).send({
      error: true,
      startTimestamp: testData.startTimestamp,
    });
    return;
  }

  res.status(200).send({
    error: false,
    ...testData.toObject(),
  });
});

router.post("/", JWTMiddleware, (req, res) => {
  const userAnswers = req.body.test.questions.map((t1) => ({
    ...t1,
    ...req.body.userAnswers.find((t2) => t2._id === t1._id),
  }));

  let score = 0;
  userAnswers.map((item) => {
    if (item.correctAnswer === item.answerIndex) {
      score += item.score;
    }
  });
  score += (req.body.userRoll + 1) * 10 * 0.2;

  let data = new UserAnswers({
    loginCodeId: req.user.id,
    testId: req.user.testId,
    userRoll: req.body.userRoll,
    userAnswers: userAnswers,
    score,
  });
  data.save();

  res.send({
    error: false,
    message: "",
  });
});

module.exports = router;
