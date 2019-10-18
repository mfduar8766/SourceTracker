const express = require("express");
const router = express.Router();
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
    .catch(error => errorMessage(res, error));
});

router.post("/agencies/add-agency", (req, res) => {
  const postBody = req.body;
  const newAgency = new AgenciesModel({
    agencyName: postBody.agencyName,
    agencyId: postBody.agencyId,
    city: postBody.city,
    state: postBody.state,
    address: postBody.address,
    zipCode: postBody.zipCode,
    totalAgents: postBody.totalAgents
  });
  newAgency.save((err, agency) => {
    if (err) {
      errorMessage(res, err);
    }
    res.status(201).json(agency);
  });
});

module.exports = router;
