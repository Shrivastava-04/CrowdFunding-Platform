import express from "express";
import {
  campaignAdd,
  campaignfind,
} from "../controller/campaign.controller.js";

const router = express.Router();

router.post("/campaignadd", campaignAdd);
router.get("/campaignfind", campaignfind);

export default router;
