const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, dbUrl } = require("./config/config");
const studentRouter = require("./routes/student.routes");
const collegeRouter = require("./routes/college.routes");
mongoose.connect(dbUrl);

app.use(express.json());
app.use("/college", collegeRouter);
app.use("/student", studentRouter);

app.listen(PORT, (err, res) => {
  if (err) {
    console.log("Unable to start the server");
  } else {
    console.log(`Server is up and running at port ${PORT}`);
  }
});
