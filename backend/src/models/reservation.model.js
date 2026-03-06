import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
{
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
    index: true
  },

  type: {
    type: String,
    enum: ["Hotel", "Flight", "Train", "Event"],
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  date: {
    type: Date,
    required: true
  },

  notes: {
    type: String,
    default: ""
  },

  confirmationNumber: {
    type: String
  }

},
{ timestamps: true }
);

reservationSchema.index({ tripId: 1, date: 1 });

export const Reservation = mongoose.model("Reservation", reservationSchema);