const express = require("express");
const router = express.Router();
const Test = require("../Models/Test");
const Questions = require("../Models/Question");
const LoginCode = require("../Models/LoginCode");
const ObjectId = require("mongoose").Types.ObjectId;
const UserAnswers = require("../Models/UserAnswers");

router.get("/list", async (req, res) => {
  let tests = await Test.find();
  res.send(tests);
});

router.post("/add", async (req, res) => {
  let totalTime = 0;
  req.body.questionList.forEach((item) => {
    item.correctAnswer = item.correctAnswer - 1;
    totalTime += item.time;
  });
  let questionsData = await Questions.insertMany(req.body.questionList);
  let questionIds = questionsData.map((item) => {
    return item._id;
  });

  let endTime = new Date(req.body.selectedDate);
  endTime.setSeconds(endTime.getSeconds() + totalTime);
  let testData = new Test({
    name: req.body.name,
    startTimestamp: new Date(req.body.selectedDate),
    endTimestamp: endTime,
    questions: questionIds,
  });

  testData.save();
});

router.post("/addUser/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.send({
      error: true,
      message: "کد آزمون نا معتبر است",
    });
    return;
  }

  let loginCodeData = new LoginCode({
    fullName: req.body.fullName,
    test: req.params.id,
  });
  await loginCodeData.save();

  res.send({
    error: false,
    message: "کاربر با موفقیت اضافه شد",
    code: loginCodeData._id,
  });
});

router.post("/statics/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.send({
      error: true,
      message: "کد آزمون نا معتبر است",
    });
    return;
  }

  let chartData = await UserAnswers.aggregate([
    { $match: { testId: { $eq: ObjectId(req.params.id) } } },
    {
      $group: {
        _id: "$score",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  let tableData = await UserAnswers.find({ testId: req.params.id }).populate("loginCodeId");

  res.send({
    chartData,
    tableData,
  });
});

router.post("/acceptUser", async (req, res) => {
  if (!ObjectId.isValid(req.body.id)) {
    res.send({
      error: true,
      message: "کد کاربر نامعتبر است",
    });
    return;
  }

  let userAnswer = await UserAnswers.findById(req.body.id);
  userAnswer.accepted = true;
  userAnswer.save();

  res.send({
    error: false,
    message: "کاربر با موفقیت پذیرفته شد",
  });
});

module.exports = router;
