const express = require("express");
const routes = express.Router();
const DropDownValues = require("../../Models/DropDownValues");

routes.get("/dropdown-values", (req, res) => {
  DropDownValues.find((err, values) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res.json(values[0]);
  });
});
module.exports = routes;
