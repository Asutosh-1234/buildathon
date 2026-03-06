import mongoose, {Schema} from "mongoose";

const tripDaySchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    activities: [{
        type: Schema.Types.ObjectId,
        ref: "Activity"
    }],
    order:{
        type: Number,
        default: 0
    },
});



export const TripDay = mongoose.model("TripDay", tripDaySchema);