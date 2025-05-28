import mongoose from "mongoose";

const campaignSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 600,
  },
  // image:{
  //     type:
  // },
  goal: {
    type: Number,
    require: true,
  },
  amountRaised: {
    type: Number,
    require: true,
  },
  deadline: {
    type: Date,
    default: () => new Date("2040-12-31T00:00:00Z"),
  },
  creatorId: {
    type: String,
    require: true,
  },
});

const campaign = mongoose.model("Campaign", campaignSchema);

export default campaign;
