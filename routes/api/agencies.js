const express = require("express");
const router = express.Router();
const Mongoose = require("mongoose");
const AgenciesModel = require("../../Models/Agencies");
const Agents = require("../../Models/Agents");
const { successMessage, errorMessage } = require("../utils/index");

router.get("/agencies", (req, res) => {
  AgenciesModel.aggregate([
    {
      $lookup: {
        from: Agents.collection.name,
        localField: "agencyId",
        foreignField: "agencyId",
        as: "agents"
      }
    }
  ])
    .then(data => successMessage(res, data, 200))
    .catch(error => errorMessage(res, error, 500));
});

router.post("/agencies/add-agency", (req, res) => {
  const postBody = req.body;
  const newAgency = new AgenciesModel({
    _id: Mongoose.Types.ObjectId(),
    agencyName: postBody.agencyName,
    agencyId: postBody.agencyId,
    city: postBody.city,
    state: postBody.state,
    address: postBody.address,
    zipCode: postBody.zipCode,
    totalAgents: postBody.totalAgents,
    agents: postBody.agents
  });
  newAgency.save((error, agency) => {
    if (error) {
      errorMessage(res, error, 500);
    }
    res.status(201).json({ agency, status: 201 });
  });
});

module.exports = router;
