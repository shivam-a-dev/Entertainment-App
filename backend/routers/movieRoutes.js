import express from "express";
import { getMovieDetails, getTrendingMovies,  getLatestShows,  getTopRatedMovies } from "../controllers/movieController.js";

const router = express.Router();

router.route('/trending').get(getTrendingMovies)
router.route('/details/:movieId').get(getMovieDetails)
router.route('/latest-shows').get(getLatestShows)
router.route('/top-movies').get(getTopRatedMovies)


export default router