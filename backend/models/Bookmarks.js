import mongoose from "mongoose";


const mediaSchema = new mongoose.Schema({
    mediaID : {type: Number, required: true},
    mediaType: {type: String, required: true, enum: ['movie', 'tv']},
    title : {type: String, required : true},
    release_year : {type: Number, required: true}
})

const bookmarkSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId,required: true, ref: 'User'},
    bookmarks: [mediaSchema]
})

// Create a compound index
bookmarkSchema.index({ user: 1, 'bookmarks.mediaId': 1, 'bookmarks.mediaType': 1 }, { unique: true });


export default mongoose.model('Bookmark', bookmarkSchema)