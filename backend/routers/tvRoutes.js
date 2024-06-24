import express from "express";
import { getOnAir, getTvDetails } from "../controllers/tvControllers.js";

const router = express.Router();


router.route('/details/:tvId').get(getTvDetails)
router.route('/on-air').get(getOnAir)



export default router