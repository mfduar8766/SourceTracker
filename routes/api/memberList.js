const express = require("express");
const router = express.Router();
const MemberListModel = require("../../Models/MemberList");

router.get("/member-list", (req, res) => {});

router.post("/member-list/add-members", (req, res) => {
  const postBody = req.body;
  const newMembers = new MemberListModel({
    name: postBody.name,
    correspondingAgency: postBody.correspondingAgency,
    Ancillary: postBody.Ancillary,
    Group: postBody.Group,
    Under65: postBody.Under65,
    Over65: postBody.Over65
  });

  newMembers.save((err, members) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res.status(201).json(members);
  });
});

module.exports = router;
