const express = require("express");
const Mongoose = require("mongoose");
const router = express.Router();
const RepsModel = require("../../Models/Reps");

router.get("/reps", (req, res) => {
  RepsModel.find()
    .then(data => res.status(200).json({ data, status: 200 }))
    .catch(error => res.status(500).json({ error, status: 500 }));
});

router.post("/reps/add-reps", (req, res) => {
  const postBody = req.body;
  const newReps = new RepsModel({
    _id: Mongoose.Types.ObjectId(),
    agencyId: postBody.agencyId,
    agentId: postBody.agentId,
    firstName: postBody.firstName,
    lastName: postBody.lastName,
    startDate: postBody.startDate,
    endDate: postBody.endDate
  });
  newReps.save((err, reps) => {
    if (err) {
      res.status(500).json({ err, status: 500 });
    }
    res.status(201).json(reps);
  });
});

module.exports = router;
