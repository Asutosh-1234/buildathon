import mongoose, { Schema } from "mongoose";

const tripDaySchema = new Schema(
{
  tripId: {
    type: Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
    index: true
  },

  date: {
    type: Date,
    required: true
  },

  order: {
    type: Number,
    default: 0
  }

},
{ timestamps: true }
);

tripDaySchema.index({ tripId: 1, order: 1 });

export const TripDay = mongoose.model("TripDay", tripDaySchema);