import axios from "axios";
import Bookmarks from "../models/Bookmarks.js";

const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = async (req, res) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/all/week?language=en-US`,
      {
        params: {
          api_key: process.env.API_KEY,
          language: "en-US",
          page: 1,
          append_to_response: "release_dates,credits",
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
};


export const getMovieDetails = async (req, res) => {
  try {
    const { movieId } = req.params;
    const user =  req.user._id;
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}`,{
        params: {
          api_key: process.env.API_KEY,
          language: "en-US",
          append_to_response: "release_dates,credits,videos",
        },
      }
    );
    
    // getting mpa rating from resposnse
    const mpaRating = response.data.release_dates.results.find(
      (result) => result.iso_3166_1 === "US"
    )?.release_dates.find((data) => data.certification !== "")?.certification;

    // checking if movie exists in bookmarks collection
    const bookmark = await Bookmarks.findOne({
      user,
      bookmarks: { $elemMatch: { mediaID: movieId, mediaType: 'movie' } },
    });

    const isBookmarked = { isBookmarked: false }
  
    if (bookmark) {
      isBookmarked.isBookmarked = true
    }
    res.json({...response.data, mpaRating, ...isBookmarked });


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
  
}
// Fetch latest movies and TV shows
export const getLatestShows = async (req, res) => {
  const movieUrl = `${BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`;
  const tvUrl = `${BASE_URL}/tv/on_the_air?api_key=${process.env.API_KEY}&language=en-US&page=1`


 try {
  const [moviesResponse, tvResponse] = await Promise.all([
    axios.get(movieUrl),
    axios.get(tvUrl),
  ]);
  const movies = moviesResponse.data.results.map(movie => ({ ...movie, media_type: 'movie' }));
  const tvShows = tvResponse.data.results.map(tv => ({ ...tv, media_type: 'tv' }));

  const combinedResults = [...movies, ...tvShows];

  // Sort by release date (or first air date for TV shows)
  combinedResults.sort((a, b) => {
    const dateA = new Date(a.release_date || a.first_air_date);
    const dateB = new Date(b.release_date || b.first_air_date);
    return dateB - dateA;
  });

  const filteredResults = combinedResults.filter((value) => value.poster_path);
 
  res.json([...filteredResults]);
 } catch (error) {
  console.error("Error fetching data:", error);
  res.status(500).send("Error fetching data");
 }
};




export const getTopRatedMovies = async (req, res) => {
  const { page } = req.query;
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
    );
    

    // Sort the movies by release date in descending order
    const sortedMovies = response.data.results.sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    });

    res.json(sortedMovies);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send(error);
  }
};
