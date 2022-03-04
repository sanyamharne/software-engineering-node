import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    messageSentBy: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    messageSentTo: {type: Schema.Types.ObjectId, ref: 'UserModel'},
    messageSentOn: {type: Date, default: Date.now}
}, {collection: 'message'});

export default MessageSchema;