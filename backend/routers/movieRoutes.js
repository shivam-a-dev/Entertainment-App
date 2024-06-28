import express from "express";
import { getMovieDetails, getTrendingMovies,  getLatestShows,  getTopRatedMovies } from "../controllers/movieController.js";
import { Aunthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/trending').get(getTrendingMovies)
router.route('/details/:movieId').get(Aunthenticated,getMovieDetails)
router.route('/latest-shows').get(getLatestShows)
router.route('/top-movies').get(getTopRatedMovies)


export default router