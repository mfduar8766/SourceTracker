const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberListSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  agencyId: Number,
  Ancillary: Number,
  Group: Number,
  Under65: Number,
  Over65: Number
});

module.exports = mongoose.model("MemberList", MemberListSchema);
