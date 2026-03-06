import mongoose, {Schema} from "mongoose";

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
        role: String,
        joinedAt: Date
    }],
});

tripMemberSchema.pre("save", function(next) {
    for (let i = 0; i < this.members.length; i++) {
        if (!this.members[i].joinedAt) {
            this.members[i].joinedAt = new Date();
        }
    }
    next();
});

export const TripMember = mongoose.model("TripMember", tripMemberSchema);