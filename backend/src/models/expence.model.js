import mongoose, {Schema} from "mongoose";
import { EXPENSE_TYPES } from "../utils/enum.js";

const expenceSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    category: {
        type: String,
        enum: Object.values(EXPENSE_TYPES),
        default: EXPENSE_TYPES.OTHER
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

expenceSchema.pre("save", function(next) {
    if (this.isNew) {
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
    next();
});

export const Expence = mongoose.model("Expence", expenceSchema);