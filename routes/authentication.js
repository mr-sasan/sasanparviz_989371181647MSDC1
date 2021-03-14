const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const LoginCode = require("../Models/LoginCode");
const UserAnswers = require("../Models/UserAnswers");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req, res) => {
  let loginCodeData = req.body.loginCode;
  if (!ObjectId.isValid(loginCodeData)) {
    res.status(200).send({
      error: true,
      message: "کد ورودی به آزمون اشتباه است",
    });
    return;
  }
  let loginCodeDB = await LoginCode.findById(loginCodeData);

  if (loginCodeDB === null) {
    res.status(200).send({
      error: true,
      message: "کد ورودی به آزمون اشتباه است",
    });
    return;
  }

  let userAnswers = await UserAnswers.find({ loginCodeId: loginCodeData });
  if (userAnswers && userAnswers.length >= 1) {
    res.status(200).send({
      error: true,
      message: "شما در حال حاظر در این آزمون شرکت کرده اید",
    });
    return;
  }

  let userData = await LoginCode.findById(loginCodeData).populate("test");
  if (Date.now() >= userData.test.endTimestamp) {
    res.status(200).send({
      error: true,
      message: "شما دیر به آزمون رسیدید و آزمون به پایان رسیده است",
    });
    return;
  }
  const timeRemaining = (userData.test.endTimestamp - Date.now()) / 1000 / 60 + 10;
  const token = jwt.sign(
    { id: userData._id, testId: userData.test._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: `${timeRemaining}m` }
  );

  res.status(200).send({
    error: false,
    message: "",
    token,
  });

  // let userData = await LoginCode.findById(loginCodeData).populate({
  //   path: "test",
  //   populate: {
  //     path: "questions",
  //   },
  // });

  // if(Date.now() >= userData.test.endTimestamp){
  //   res.status(200).send({
  //     error: true,
  //     message: "شما دیر به آزمون رسیدید و آزمون به پایان رسیده است"
  //   });
  // }
});

module.exports = router;
