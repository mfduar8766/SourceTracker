const express = require("express");
const router = express.Router();
const AgentModel = require("../../Models/Agents");

router.get("/agents", (req, res) => {
  AgentModel.find()
    .then(data => res.status(200).json({ data, status: 200 }))
    .catch(error => res.status(500).json({ error, status: 500 }));
});

router.post("/agent/add-agent", (req, res) => {
  const postBody = req.body;
  const newAgent = new AgentModel({
    agencyId: postBody.agencyId,
    agentId: postBody.agentId,
    photo: postBody.photo,
    firstName: postBody.firstName,
    lastName: postBody.lastName,
    members: postBody.members,
    startDate: postBody.startDate,
    endDate: postBody.endDate
  });
  newAgent.save((err, agent) => {
    if (err) {
      res.status(500).json({ err, status: 500 });
    }
    res.status(201).json(agent);
  });
});

router.patch("/agencies/:agencyId/:agentId/agent", (req, res) => {
  const agencyName = req.params.agencyName;
  const agentId = parseInt(req.params.agentId);
  const agentData = req.body.data;
  const agencyId = parseInt(req.body.agencyId);
});

module.exports = router;
