const studentModelMethod = require("../model/studentModel");
const collegeModelMethod = require("../model/collegeModel");
const bcryptjs = require("bcryptjs");
const jwt= require("jsonwebtoken");
const { JWTSECRET } = require("../config/config");

let createStudent = async (req, res) => {
  try {
    let studentObj = {};
    let collegeObj = {};
    if (
      req.body.studentName &&
      req.body.studentEmail &&
      req.body.studentPassword &&
      req.body.collegeName &&
      req.body.collegeState
    ) {
      studentObj.studentName = req.body.studentName;
      studentObj.studentEmail = req.body.studentEmail;
      studentObj.studentPassword = req.body.studentPassword;
      collegeObj.collegeName = req.body.collegeName;
      collegeObj.collegeState = req.body.collegeState;
    } else {
      return res.send(
        `studentName, studentEmail, studentPassword, collegeName, collegeState is required`
      );
    }

    let findCollegeId = await collegeModelMethod.getCollege(collegeObj);
    console.log(
      "--------------------------------------------------------------",
      findCollegeId[0]._id
    );

    studentObj.studentCollegeId = findCollegeId[0]._id;
    const encryptedPassword = await bcryptjs.hash(
      studentObj.studentPassword,
      8
    );

    studentObj.studentPassword = encryptedPassword;

    let createdStudent = await studentModelMethod.createStudent(studentObj);
    const token= await jwt.sign(JSON.stringify(createdStudent),JWTSECRET)
    res.send(`student Created Sucessfully:\n ${createdStudent} \n Token : ${token}`);
  } catch (err) {
    res.send(`Unable to Create student :\n ${err}`);
  }
};

let getStudent = async (req, res) => {
  let conditionObj = {};
  if (req.query.studentName) {
    conditionObj.studentName = { $regex: req.query.studentName, $options: "i" };
  }
  try {
    let getStudent = await studentModelMethod.getStudent(conditionObj);
    res.send(`Students list :\n ${getStudent}`);
  } catch (err) {
    res.send(`Unable to get Students :\n ${err}`);
  }
};

const loginStudent = async (req, res) => {
  let loginObj = {};
  if (req.body.email && req.body.password) {
    loginObj.studentEmail = req.body.email;
  } else {
    return res.send(`Please enter your email and password`);
  }
  try {
    let getStudent = await studentModelMethod.getStudent(loginObj);
    let passIsMatch = await bcryptjs.compare(
      req.body.password,
      getStudent[0].studentPassword
    );
    if (passIsMatch) {
      const token= await jwt.sign(JSON.stringify(getStudent[0]),JWTSECRET)
      return res.send(`Login success Welcome!  : ${getStudent[0].studentName} \n your token : ${token}`);
    }
    res.send(`Invalid credentials`);
  } catch (err) {
    res.send(`Unable to get Students :\n ${err}`);
  }
};

module.exports = { createStudent, getStudent, loginStudent };
