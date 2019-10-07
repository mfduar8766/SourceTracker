const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionName = "Agencies";
const AgenciesSchema = new Schema({
  agencies: [
    {
      agencyName: String,
      agencyId: Number,
      city: String,
      state: String,
      address: String,
      zipCode: String,
      totalAgents: Number,
      agents: [
        {
          correspondingAgency: String,
          agentId: Number,
          photo: String,
          firstName: String,
          lastName: String,
          members: Number,
          startDate: String,
          endDate: String,
          reps: [
            {
              id: String,
              correspondingAgency: String,
              firstName: String,
              lastName: String,
              startDate: String,
              endDate: String
            }
          ],
          membersList: [
            {
              name: String,
              Ancillary: Number,
              Group: Number,
              Under65: Number,
              Over65: Number
            }
          ]
        }
      ]
    }
  ]
});

module.exports = mongoose.model("agencies", AgenciesSchema,collectionName);
