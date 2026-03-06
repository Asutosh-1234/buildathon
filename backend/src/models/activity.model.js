import mongoose, { Schema } from "mongoose";
import { ACTIVITY_STATUS } from "../utils/enum.js";

const activitySchema = new Schema({
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
    index: true
  },

  dayId: {
    type: Schema.Types.ObjectId,
    ref: "Day",
    required: true,
    index: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  location: {
    type: String,
    trim: true
  },

  startTime: {
    type: Date
  },

  endTime: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!this.startTime) return true;
        return value > this.startTime;
      }
    }
  },

  order: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: Object.values(ACTIVITY_STATUS),
    default: ACTIVITY_STATUS.UPCOMING
  },

  notes: {
    type: String,
    trim: true
  },

  attachments: [
    {
      url: String,
      fileName: String
    }
  ],

  coordinates: {
    lat: Number,
    lng: Number
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

activitySchema.index({ tripId: 1, dayId: 1, order: 1 });

export const Activity = mongoose.model("Activity", activitySchema);