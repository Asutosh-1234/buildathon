import mongoose, {Schema} from "mongoose";
import { TRIP_MEMBER_ROLES } from "../utils/enum.js";

const tripMemberSchema = new mongoose.Schema({
    tripId: {
        type: Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    members: [{
        userId: Schema.Types.ObjectId,
        email: String,
        name: String,
        role: {
            type: String,
            default: TRIP_MEMBER_ROLES.VIEWER,
            enum: TRIP_MEMBER_ROLES,
        },
        joinedAt: Date
    }],
});



export const TripMember = mongoose.model("TripMember", tripMemberSchema);
