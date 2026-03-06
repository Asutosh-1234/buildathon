import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    avatar: {
        type: String,
        default: "https://placehold.co/200x200"
    }

},
{
    timestamps: true
});

export const User = mongoose.model("User", userSchema);