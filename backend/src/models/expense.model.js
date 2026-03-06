import mongoose, { Schema } from "mongoose";
import { EXPENSE_TYPES } from "../utils/enum.js";

const expenseSchema = new Schema(
  {
    tripId: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
      index: true,
    },

    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    category: {
      type: String,
      enum: Object.values(EXPENSE_TYPES),
      default: EXPENSE_TYPES.OTHER,
    },
  },
  { timestamps: true } // handles createdAt & updatedAt automatically
);

expenseSchema.index({ tripId: 1, date: 1 });

export const Expense = mongoose.model("Expense", expenseSchema);