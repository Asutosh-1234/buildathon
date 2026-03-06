import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
{
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
    index: true
  },

  dayId: {
    type: Schema.Types.ObjectId,
    ref: "TripDay",
    required: true
  },

  activityId: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  content: {
    type: String,
    required: true,
    trim: true
  }

},
{
  timestamps: true
});

commentSchema.index({ activityId: 1, createdAt: 1 });

export const Comment = mongoose.model("Comment", commentSchema);