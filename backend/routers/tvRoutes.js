import express from "express";
import { getOnAir, getTvDetails } from "../controllers/tvControllers.js";
import { Aunthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/details/:tvId').get(Aunthenticated,getTvDetails)
router.route('/on-air').get(getOnAir)



export default router