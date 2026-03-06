import mongoose, { Schema } from "mongoose";

const checklistSchema = new Schema({
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  items: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

export const Checklist = mongoose.model("Checklist", checklistSchema);