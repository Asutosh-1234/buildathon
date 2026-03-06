import mongoose, { Schema } from "mongoose";
import { TRIP_MEMBER_ROLES } from "../utils/enum.js";

const tripMemberSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(TRIP_MEMBER_ROLES),
      default: TRIP_MEMBER_ROLES.VIEWER,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

tripMemberSchema.index({ tripId: 1, userId: 1 }, { unique: true });

export const TripMember = mongoose.model("TripMember", tripMemberSchema);
