import express from "express";  
import { search } from "../controllers/searchController.js";
import { Aunthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('').get( Aunthenticated, search)
export default router;