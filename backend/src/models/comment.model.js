import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true,
    },
    dayId: {
      type: Schema.Types.ObjectId,
      ref: "TripDay",
    },

    activityId: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

commentSchema.pre("validate", function (next) {
  if (!this.dayId && !this.activityId) {
    return next(new Error("A comment must be linked to either a day or an activity."));
  }
  next();
});

commentSchema.index({ activityId: 1, createdAt: 1 });
commentSchema.index({ dayId: 1, createdAt: 1 });

export const Comment = mongoose.model("Comment", commentSchema);
