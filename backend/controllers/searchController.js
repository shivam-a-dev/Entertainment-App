import axios from "axios";
import Bookmarks from "../models/Bookmarks.js";

export const search = async (req, res) => {
  const { query, type } = req.query;
  const user = req.user._id;

  if (type === "bookmarks") {
    try {
      const bookmarksDoc = await Bookmarks.findOne({ user });

      if (!bookmarksDoc) {
        res.status(404).json({ message: "No bookmarks found" });
        return;
      }

      const bookmarks = await Bookmarks.aggregate([
        { $match: { user } },
        { $unwind: "$bookmarks" },
        {
          $match: {
            "bookmarks.title": { $regex: query, $options: "i" },
          },
        },
        {
          $group: {
            _id: "$_id",
            bookmarks: { $push: "$bookmarks" },
          },
        },
      ]);

      if (bookmarks.length === 0 || bookmarks[0].bookmarks.length === 0) {
        res.status(404).json({ message: "No bookmarks found matching the query" });
        return;
      }

      res.json(bookmarks[0].bookmarks);
    } catch (error) {
      console.error("Error searching bookmarks:", error);
      res.status(500).json({ message: "Error searching bookmarks" });
    }
  } else {
    const url = `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length === 0) {
        res.status(404).json({ message: "No results found" });
        return;
      }
      res.json(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Error fetching data" });
    }
  }
};
