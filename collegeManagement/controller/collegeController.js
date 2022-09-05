const modelMethod = require("../model/collegeModel");

let createCollege = async (req, res) => {
  try {
    let conditionObj = {};
    if (req.body.collegeName) {
      conditionObj.collegeName = req.body.collegeName;
    } else {
      return res.send(`collegeName is required`);
    }
    if (req.body.collegeState) {
      conditionObj.collegeState = req.body.collegeState;
    } else {
      return res.send(`collegeState is required`);
    }
    let createdCollege = await modelMethod.createCollege(conditionObj);
    res.send(`College Created Sucessfully:\n ${createdCollege}`);
  } catch (err) {
    res.send(`Unable to Create College :\n ${err}`);
  }
};

let updateCollege = async (req, res) => {
  let conditionObj = {};
  if (req.body.collegeName) {
    conditionObj.collegeName = req.body.collegeName;
  }
  if (req.body.collegeState) {
    conditionObj.collegeState = req.body.collegeState;
  }
  try {
    let updatedCollege = await modelMethod.updateCollege(
      req.params.collegeId,
      conditionObj
    );
    res.send(`College updated Sucessfully:\n ${updatedCollege}`);
  } catch (err) {
    res.send(`Unable to update College :\n ${err}`);
  }
};

let getCollege = async (req, res) => {
  let conditionObj = {};
  if (req.query.collegeName) {
    conditionObj.collegeName = { $regex: req.query.collegeName, $options: "i" };
  }
  if (req.query.collegeState) {
    conditionObj.collegeState = {
      $regex: req.query.collegeState,
      $options: "i",
    };
  }
  try {
    let getCollege = await modelMethod.getCollege(conditionObj);
    res.send(`Colleges list :\n ${getCollege}`);
  } catch (err) {
    res.send(`Unable to get Colleges :\n ${err}`);
  }
};

let deleteCollege = async (req, res) => {
  try {
    let deleteCollege = await modelMethod.deleteCollege(req.params.collegeId);
    res.send(`College deleted Sucessfully:\n ${deleteCollege}`);
  } catch (err) {
    res.send(`Unable to delete College :\n ${err}`);
  }
};

module.exports = { createCollege, updateCollege, getCollege, deleteCollege };
