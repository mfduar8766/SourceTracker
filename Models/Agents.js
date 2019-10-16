const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AgentsModel = new Schema({
  _id: Schema.Types.ObjectId,
  agencyId: Number,
  agentId: Number,
  photo: String,
  firstName: String,
  lastName: String,
  members: Number,
  startDate: String,
  endDate: String,
  reps: [{ type: Schema.Types.ObjectId, ref: "Rep" }],
  membersList: [{ type: Schema.Types.ObjectId, ref: "MemberList" }]
});

module.exports = mongoose.model("Agent", AgentsModel);
