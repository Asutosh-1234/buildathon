import mongoose, { Schema } from "mongoose";

const checklistItemSchema = new Schema(
{
  checklistId: {
    type: Schema.Types.ObjectId,
    ref: "Checklist",
    required: true,
    index: true
  },

  text: {
    type: String,
    required: true,
    trim: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
});

export const ChecklistItem = mongoose.model("ChecklistItem", checklistItemSchema);