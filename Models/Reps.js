const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepSchema = new Schema({
  _id: Schema.Types.ObjectId,
  agencyId: Number,
  agentId: Number,
  firstName: String,
  lastName: String,
  startDate: String,
  endDate: String
});

module.exports = mongoose.model("Rep", RepSchema);
