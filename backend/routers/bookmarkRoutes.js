import express  from "express";
import {IsBookmarked, createBookmark, getBookmarks} from '../controllers/bookmarksController.js'  
import { Aunthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("").post(Aunthenticated, createBookmark).get(Aunthenticated, getBookmarks);
router.route("/is-bookmarked").post(Aunthenticated, IsBookmarked);

export default router