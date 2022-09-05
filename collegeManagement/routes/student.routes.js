const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

router.post("/", studentController.createStudent);
// router.patch("/:collegeId", studentController.updateStudent);
router.get("/", studentController.getStudent);
// router.delete("/:collegeId", studentController.deleteStudent);

module.exports = router;
