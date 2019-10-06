const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoURI = require("./config");
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

//Connect to DB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("connected to DB.");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
const dropDownValues = require("./routes/api/dropdownValues");

//API
app.use("/api/v1", dropDownValues);

app.listen(port, () => console.log(`listening on port: ${port}`));
