const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AgenciesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  agencyName: String,
  agencyId: Number,
  city: String,
  state: String,
  address: String,
  zipCode: String,
  totalAgents: Number,
  agents: [{ type: Schema.Types.ObjectId, ref: "Agent" }]
});

module.exports = mongoose.model("Agency", AgenciesSchema);
