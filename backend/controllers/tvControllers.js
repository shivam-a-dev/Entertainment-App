import axios from "axios";
import Bookmarks from "../models/Bookmarks.js";

const BASE_URL = "https://api.themoviedb.org/3";

export const getTvDetails = async (req, res) => {
  const { tvId } = req.params;
  const user =  req.user._id;
  const mpaRatingUrl = `${BASE_URL}/tv/${tvId}/content_ratings`;
  const detailsUrl = `${BASE_URL}/tv/${tvId}`;

  try {
    const [mpaResponse, detailsResponse] = await Promise.all([
      await axios.get(mpaRatingUrl, {
        params: {
          api_key: process.env.API_KEY,
          language: "en-US",
        },
      }),

      await axios.get(detailsUrl, {
        params: {
          api_key: process.env.API_KEY,
          language: "en-US",
          append_to_response: "credits",
        },
      }),
    ]);
    const mpaRating = mpaResponse.data.results.find(
      (result) => result.iso_3166_1 === "US"
    )?.rating;

    // checking if tv exists in bookmarks collection
     const bookmark = await Bookmarks.findOne({
      user,
      bookmarks: { $elemMatch: { mediaID: tvId, mediaType: 'tv' } },
    });

    const isBookmarked = { isBookmarked: false }
  
    if (bookmark) {
      isBookmarked.isBookmarked = true
    }



    res.json({ ...detailsResponse.data, mpaRating, ...isBookmarked });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
};

export const getOnAir = async (req, res) => {
  const { page } = req.query;
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/tv?api_key=${process.env.API_KEY}&first_air_date_year=2023&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=7&vote_count.gte=100&watch_region=IN `
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send(error);
  }
};
