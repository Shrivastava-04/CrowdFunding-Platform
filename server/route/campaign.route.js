import express from "express";
import {
  campaignAdd,
  campaignfind,
  campaignFindById,
  campaigns,
} from "../controller/campaign.controller.js";

const router = express.Router();

router.post("/campaignadd", campaignAdd);
router.get("/campaignfind", campaignfind);
router.get("/campaigns",campaigns);
router.get("/campaignfindbyid",campaignFindById)

export default router;
