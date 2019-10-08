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

//Connect to DB
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://mfduar8766:Schecterguitars0060792!@ds211143.mlab.com:11143/source-tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.once("open", () => {
  console.log("connected to DB.");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dropDownValues = require("./routes/api/dropdownValues");
const Agencies = require("./routes/api/agencies");

app.use("/api/v1", dropDownValues);
app.use("/api/v1", Agencies);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`listening on port: ${port}`));
