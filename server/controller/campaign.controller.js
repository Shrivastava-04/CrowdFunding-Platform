import Campaign from "../models/campaign.model.js";
import mongoose from "mongoose";

export const campaignAdd = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      goal,
      amountRaised,
      deadline,
      creatorId,
    } = req.body;
    const camp = await Campaign.findOne({ title });
    if (camp) {
      return res
        .status(400)
        .json({ message: "This title already exist, Please choose another" });
    }
    const createCampaign = await new Campaign({
      title: title,
      description: description,
      category: category,
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

export const campaigns = async (req,res)=>{
  try {
    const camp = await Campaign.find();
    if(!camp){
      return res.status(400).json({message:"No Campaign exist"});
    }
    const sortedCamp = [...camp].sort((a,b)=>
      ((b.amountRaised*100)/b.goal)-((a.amountRaised*100)/a.goal)
    )
    res.status(201).json(sortedCamp);
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error",
    })
  }
}

export const campaignFindById = async (req,res)=>{
  try {
    const {_id} = req.query;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const camp = await Campaign.find({_id})
    if(!camp){
      return res.status(400).json({message:"No such campaign exist"});
    }
    res.status(200).json(camp);
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Internal Server Error"})
  }
}