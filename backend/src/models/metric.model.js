const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["signup", "sales", "session"],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    // For charts like "Sales by Category"
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Metric = mongoose.model("Metric", metricSchema);

module.exports = Metric;
