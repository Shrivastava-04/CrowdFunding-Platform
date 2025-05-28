import Campaign from "../models/campaign.model.js";

export const campaignAdd = async (req, res) => {
  try {
    const { title, description, goal, amountRaised, deadline, creatorId } =
      req.body;
    const camp = await Campaign.findOne({ title });
    if (camp) {
      return res
        .status(400)
        .json({ message: "This title already exist, Please choose another" });
    }
    const createCampaign = await new Campaign({
      title: title,
      description: description,
      goal: goal,
      amountRaised: amountRaised,
      deadline: deadline,
      creatorId: creatorId,
    });
    createCampaign.save();
    res.status(201).json({
      message: "Campaign created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const campaignfind = async (req, res) => {
  try {
    const { title } = req.body;
    const camp = await Campaign.find({ title });
    if (!camp) {
      return res.status(400).json({ message: "No Such Campaign exist" });
    }
    res.status(201).json({
      message: "Campaign Found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
