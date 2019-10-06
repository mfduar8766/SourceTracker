const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoURI = require("./config");
const port = process.env.PORT || 5000;
const path = require('path');
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`listening on port: ${port}`));
