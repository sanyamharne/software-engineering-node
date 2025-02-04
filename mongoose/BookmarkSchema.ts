import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type:Schema.Types.ObjectId, ref: 'TuitModel'},
    bookMarkedBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
}, {collection: 'bookmarks'});

export default BookmarkSchema;