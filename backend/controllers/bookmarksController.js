import expressAsyncHandler from "express-async-handler";
import Bookmarks from "../models/Bookmarks.js";

export const createBookmark = expressAsyncHandler(async (req, res) => {
  const { mediaID, mediaType, title, release_year } = req.body;
  const userId = req.user._id;


  if (!mediaID || !mediaType) {
    res.status(400).send({ message: "Invalid media type or id" });
    return;
  }

  try {
    const bookmark = await Bookmarks.findOneAndUpdate(
      { user: userId },
      { 
        $addToSet: { bookmarks: { mediaID, mediaType, title, release_year } }
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Bookmark created", bookmark });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const IsBookmarked = expressAsyncHandler(async (req, res) => {
  const { mediaID, mediaType } = req.body;
  const user =  req.user._id;
  if (!mediaID || !mediaType) {
    res.status(400).send({ message: "Invalid media type or id" });
    return;
  }

  const bookmark = await Bookmarks.findOne({
    user,
    bookmarks: { $elemMatch: { mediaID, mediaType } },
  });

  if (bookmark) {
    res.send({ isBookmarked: true });
    return;
  } else {
    res.send({ isBookmarked: false });
    return;
  }
});

export const getBookmarks = expressAsyncHandler(async (req, res) => {
  const user =  req.user._id;

 try {
  const bookmarks = await Bookmarks.findOne({ user });
  res.json(bookmarks.bookmarks)
 } catch (error) {
  res.status(500).json({ message: 'No bookmarks found' });
 }
});
