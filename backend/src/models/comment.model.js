/* Comment {
  _id (PK)
  tripId ObjectId (ref: Trip, indexed)
  dayId (FK)
  activityId (FK)
  userId (FK)
  content string
  createdAt date
} */

import mongoose, {Schema} from "mongoose";

const commentSchema = new mongoose.Schema({
    tripId: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    dayId: {
        type: Schema.Types.ObjectId,
        ref: "Day",
        required: true
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: "Activity",
        required: true
    },
    content: {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
});

commentSchema.pre("save", function(next) {
    if (this.isNew) {
        this.content.timestamp = Date.now();
    }
    next();
});

export const Comment = mongoose.model("Comment", commentSchema);