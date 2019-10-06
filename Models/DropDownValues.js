const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionName = 'dropdownValues';
const DropDownValuesSchema = new Schema({
  globalSearchOptions: { type: Array, required: true },
  agencyDropDownValues: [
    { value: String, label: String },
    { value: String, label: String },
    { value: String, label: String },
    { value: String, label: String },
    { value: String, label: String },
    { value: String, label: String }
  ],
  repHeaders: [
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String }
  ],
  agentHeaders: [
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String }
  ],
  agencyHeaders: [
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String },
    { id: Number, name: String, prop: String }
  ]
});

module.exports = mongoose.model("dropdownValues", DropDownValuesSchema,collectionName);
