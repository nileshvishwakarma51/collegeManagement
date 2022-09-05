const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegeController");

router.post("/", collegeController.createCollege);
router.patch("/:collegeId", collegeController.updateCollege);
router.get("/", collegeController.getCollege);
router.delete("/:collegeId", collegeController.deleteCollege);

module.exports = router;
