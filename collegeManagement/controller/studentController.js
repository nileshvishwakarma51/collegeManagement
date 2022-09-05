const studentModelMethod = require("../model/studentModel");
const collegeModelMethod = require("../model/collegeModel");

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

    console.log("student ka object", studentObj);

    let createdStudent = await studentModelMethod.createStudent(studentObj);
    res.send(`student Created Sucessfully:\n ${createdStudent}`);
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

module.exports = { createStudent, getStudent };
