const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  studentEmail: {
    type: String,
    required: true,
    trim: true,
  },
  studentPassword: {
    type: String,
    required: true,
    trim: true,
  },
  studentCollegeId: {
    type: mongoose.Types.ObjectId,
    ref: "college",
    required: true,
    trim: true,
  },
});

const student = mongoose.model("student", studentSchema);

const createStudent = async (studentObj) => {
  console.log("create student :", studentObj);
  try {
    console.log(studentObj);
    const createdstudent = await student.create(studentObj);
    return createdstudent;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

let getStudent = async (studentObj) => {
  try {
    console.log("get Student :", studentObj);
    const getStudent = await student
      .find(studentObj, { _id: false, __v: false })
      .populate("studentCollegeId");
    return getStudent;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

module.exports = { createStudent, getStudent };
