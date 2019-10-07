const express = require("express");
const routes = express.Router();
const AgenciesModel = require("../../Models/Agencies");

routes.get("/agencies", (req, res) => {
  AgenciesModel.find((err, agencies) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res.json(agencies[0].agencies);
  });
});

module.exports = routes;
