const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoURI = require("./config");
const port = process.env.PORT || 5000;
const path = require("path");
const app = express();
app.use(cors());

const API_VERSION = "/api/v1";

mongoose.connect(process.env.MONGODB_URI || mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("connected to DB.");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dropDownValues = require("./routes/api/dropdownValues");
const Agencies = require("./routes/api/agencies");
const Agents = require("./routes/api/agents");
const MembersList = require("./routes/api/memberList");
const Reps = require("./routes/api/reps");

app.use(API_VERSION, dropDownValues);
app.use(API_VERSION, Agencies);
app.use(API_VERSION, Agents);
app.use(API_VERSION, MembersList);
app.use(API_VERSION, Reps);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`listening on port: ${port}`));
