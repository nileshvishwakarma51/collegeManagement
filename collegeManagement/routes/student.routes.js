const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

router.post("/", studentController.createStudent);
router.post("/login", studentController.loginStudent);
router.get("/", studentController.getStudent);
// router.delete("/:collegeId", studentController.deleteStudent);

module.exports = router;
