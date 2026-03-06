import mongoose, { Schema } from "mongoose";

const tripSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "endDate must be after startDate",
      },
    },
  },
  { timestamps: true }
);

tripSchema.index({ createdBy: 1, startDate: 1 });

export const Trip = mongoose.model("Trip", tripSchema);