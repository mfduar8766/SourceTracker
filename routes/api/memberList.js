const express = require("express");
const Mongoose = require("mongoose");
const router = express.Router();
const MemberListModel = require("../../Models/MemberList");
const { errorMessage, successMessage } = require("../utils/index");

router.get("/member-list", (req, res) => {
  MemberListModel.find()
    .then(data => successMessage(res, data, 200))
    .catch(error => errorMessage(error, 500));
});

router.post("/member-list/add-members", (req, res) => {
  const postBody = req.body;
  const newMembers = new MemberListModel({
    _id: Mongoose.Types.ObjectId(),
    name: postBody.name,
    correspondingAgency: postBody.correspondingAgency,
    Ancillary: postBody.Ancillary,
    Group: postBody.Group,
    Under65: postBody.Under65,
    Over65: postBody.Over65
  });
  newMembers.save((err, members) => {
    if (err) {
      errorMessage(err, 500);
    }
    res.status(201).json(members);
  });
});

module.exports = router;
