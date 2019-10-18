const express = require("express");
const router = express.Router();
const AgentModel = require("../../Models/Agents");
const RepsModel = require("../../Models/Reps");
const MembersListModel = require("../../Models/MemberList");
const { errorMessage, successMessage } = require("../utils/index");

router.get("/agents", (req, res) => {
  AgentModel.aggregate([
    {
      $lookup: {
        from: RepsModel.collection.name,
        localField: "agentId", 
        foreignField: "agentId",
        as: "reps"
      }
    },
    {
      $lookup: {
        from: MembersListModel.collection.name,
        localField: "agentId", 
        foreignField: "agentId",
        as: "membersList"
      }
    }
  ])
    .then(data => successMessage(res, data, 200))
    .catch(error => errorMessage(error, 500));
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
      errorMessage(err, 500);
    }
    res.status(201).json(agent);
  });
});

router.patch("/agent/:agentId", (req, res) => {
  const agentId = parseInt(req.params.agentId);
  const agentData = req.body.data;
  AgentModel.findOne({ agentId: agentId })
    .then(agent => {
      agent.startDate = agentData.startDate;
      agent.endDate = agentData.endDate;
      agent.save((error, data) => {
        if (error) {
          errorMessage(error, 500);
        }
        res.status(201).json(data);
      });
    })
    .catch(error => errorMessage(error, 500));
});

module.exports = router;
