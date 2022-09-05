const mongoose = require("mongoose");

const collegeSchema = mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  collegeState: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
});

const college = mongoose.model("college", collegeSchema);

const createCollege = async (collegeObj) => {
  console.log("create college :", collegeObj);
  try {
    console.log(collegeObj);
    const createdCollege = await college.create(collegeObj);
    return createdCollege;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

let updateCollege = async (id, collegeObj) => {
  try {
    console.log("update college :", id, collegeObj);
    const updateCollege = await college.findByIdAndUpdate(id, collegeObj, {
      new: true,
    });
    return updateCollege;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

let getCollege = async (collegeObj) => {
  try {
    console.log("get college :", collegeObj);
    const getCollege = await college.find(collegeObj);
    return getCollege;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

let deleteCollege = async (id) => {
  try {
    console.log("delete college :", id);
    const deleteCollege = await college.findByIdAndDelete(id);
    return deleteCollege;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

module.exports = { createCollege, updateCollege, getCollege, deleteCollege };
